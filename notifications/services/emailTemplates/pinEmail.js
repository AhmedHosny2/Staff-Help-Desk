module.exports = function (text, pin) {
	return `<html>
   <head>
     <style>
       body {
         font-family: 'Arial', sans-serif;
         margin: 0;
         padding: 0;
         background-color: #ffffff;
       }
 
       .container {
         max-width: 600px;
         margin: 0 auto;
         padding: 20px;
       }
 
       .header {
         text-align: center;
         font-size: 24px;
         font-weight: bold;
         margin-bottom: 20px;
       }
 
       .paragraph {
         text-align: center;
         font-size: 16px;
         margin-bottom: 20px;
       }
 
       .pin-section {
         text-align: center;
         background-color: #f0f0f0;
         padding: 10px;
         border-radius: 5px;
         font-size: 20px;
         margin-bottom: 20px;
       }
     </style>
   </head>
   <body>
     <div class="container">
       <div class="header">DeskMate</div>
       <p class="paragraph">${text}</p>
       <div class="pin-section">${pin}</div>
     </div>
   </body>
 </html>
 `;
};
