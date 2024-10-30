document.getElementById('palindrome-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    
    // Log the event of form submission
    console.log("Form submitted");
  
    // Get the text input from the form
    const text = document.getElementById('text').value;
    console.log("Text input:", text);
  
    // Log that the fetch request is starting
    console.log("Sending POST request to /check-palindrome with text:", text);
  
    // Send the POST request to the server
    const response = await fetch('/check-palindrome', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text })
    });
  
    // Log the response status to check if the request was successful
    console.log("Response received with status:", response.status);
  
    // Parse the JSON result from the response
    const result = await response.json();
    console.log("Response JSON data:", result);
  
    // Display the result on the page and log the final displayed message
    const message = result.isPalindrome
      ? `"${text}" spelled backwards is the same thing!`
      : `"${text}" is not a palindrome.`;
    document.getElementById('result').textContent = message;
  
    console.log("Displayed result:", message);
  });
  
  