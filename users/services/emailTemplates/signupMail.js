module.exports = function (subject, text, pint) {
	return `
	  <html>
		 <head>
			<title>${subject}</title>
		 </head>
		 <body>
			<div>
			  <p>${text}</p>
			  <img
				 src="${pint}"
				 class=""
				 width="20"
				 height="20"
				 style="
					display: block;
					border: 0;
					outline: 0;
					line-height: 100%;
					-ms-interpolation-mode: bicubic;
					width: 20px;
					height: auto;
					max-width: 100%;
				 "
				 alt=""
			  />
			</div>
		 </body>
	  </html>
	`;
};
