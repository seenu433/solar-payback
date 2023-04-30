function Calculator() {

    var jsonData = {
        "capitalLessIncentives": "18700",
        "capitalInterestRatePercent": "0",
        "avgMonthlyBill": "150",
        "monthlyUtilityCharges": "30",
        "annualRateIncreasePercent_consumption":"5",
        "annualRateIncreasePercent_utility": "5"
      }
  
    function handleClick() {
      
      // Send data to the backend via POST
      fetch('/api/calculate', {  // Enter your IP address here
  
        method: 'POST', 
        mode: 'cors', 
        body: JSON.stringify(jsonData) // body data type must match "Content-Type" header
  
      }).then(response =>{
        return response.json();
      }).then(data =>{
        console.log(data);
      })   
      
    }
  
    return (
      <div onClick={handleClick} style={{
        textAlign: 'center',
        width: '100px',
        border: '1px solid gray',
        borderRadius: '5px'
      }}>
        Send data to backend
      </div>
    );
  
  }
  
  export { Calculator };