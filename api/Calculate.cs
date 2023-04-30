using System;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;

namespace SolarPayback
{
    public static class Calculate
    {
        [FunctionName("Calculate")]
        public static async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Anonymous, "post", Route = "calculate")] HttpRequest req,
            ILogger log)
        {
                string requestBody = await new StreamReader(req.Body).ReadToEndAsync();
                dynamic data = JsonConvert.DeserializeObject(requestBody);

                double capitalLessIncentives = data?.capitalLessIncentives;
                double capitalInterestRatePercent = data?.capitalInterestRatePercent;

                double avgMonthlyBill = data?.avgMonthlyBill;
                double monthlyUtilityCharges = data?.monthlyUtilityCharges;

                double annualRateIncreasePercent_consumption = data?.annualRateIncreasePercent_consumption;
                double annualRateIncreasePercent_utility = data?.annualRateIncreasePercent_utility;

                double year = 0;

                do {
                    var annualConsumption = avgMonthlyBill * 12;
                    var annualUtilityCharges = monthlyUtilityCharges * 12;

                    year++;
                    capitalLessIncentives = (capitalLessIncentives + annualUtilityCharges - annualConsumption) * (1+capitalInterestRatePercent/100);
                    avgMonthlyBill = avgMonthlyBill * (1+annualRateIncreasePercent_consumption / 100); 
                    monthlyUtilityCharges = monthlyUtilityCharges * (1+annualRateIncreasePercent_utility / 100);

                    log.LogInformation(year.ToString() + " " + capitalLessIncentives.ToString()  + " " + avgMonthlyBill.ToString()  + " " + monthlyUtilityCharges.ToString() );

                }while(capitalLessIncentives > 0);
                

                string responseMessage = year.ToString();

                return new OkObjectResult(responseMessage);
        }
    }
}
