module.exports = function (subject, text) {
	return `
	<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "https://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html
	xmlns="https://www.w3.org/1999/xhtml"
	xmlns:v="urn:schemas-microsoft-com:vml"
	xmlns:o="urn:schemas-microsoft-com:office:office"
>
	<head>
		<meta charset="UTF-8" />
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
		<!--[if !mso]><!-->
		<meta http-equiv="X-UA-Compatible" content="IE=edge" />
		<!--<![endif]-->
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<meta name="format-detection" content="telephone=no" />
		<meta name="format-detection" content="date=no" />
		<meta name="format-detection" content="address=no" />
		<meta name="format-detection" content="email=no" />
		<meta name="x-apple-disable-message-reformatting" />
		<link
			href="https://fonts.googleapis.com/css?family=Fira+Sans:ital,wght@0,100;1,100;0,200;1,200;0,300;1,300;0,400;1,400;0,500;1,500;0,600;1,600;0,700;1,700;0,800;1,800;0,900;1,900"
			rel="stylesheet"
		/>
		<title>DeskMate Email Template</title>
		<!-- Made with Postcards by Designmodo https://designmodo.com/postcards -->
		<!--[if !mso]><!-->
		<style>
			@media all {
				/* cyrillic-ext */
				@font-face {
					font-family: 'Fira Sans';
					font-style: normal;
					font-weight: 400;
					src: local('Fira Sans Regular'), local('FiraSans-Regular'),
						url(https://fonts.gstatic.com/s/firasans/v10/va9E4kDNxMZdWfMOD5VvmojLazX3dGTP.woff2)
							format('woff2');
					unicode-range: U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F,
						U+FE2E-FE2F;
				}
				/* cyrillic */
				@font-face {
					font-family: 'Fira Sans';
					font-style: normal;
					font-weight: 400;
					src: local('Fira Sans Regular'), local('FiraSans-Regular'),
						url(https://fonts.gstatic.com/s/firasans/v10/va9E4kDNxMZdWfMOD5Vvk4jLazX3dGTP.woff2)
							format('woff2');
					unicode-range: U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;
				}
				/* latin-ext */
				@font-face {
					font-family: 'Fira Sans';
					font-style: normal;
					font-weight: 400;
					src: local('Fira Sans Regular'), local('FiraSans-Regular'),
						url(https://fonts.gstatic.com/s/firasans/v10/va9E4kDNxMZdWfMOD5VvmYjLazX3dGTP.woff2)
							format('woff2');
					unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF,
						U+2113, U+2C60-2C7F, U+A720-A7FF;
				}
				/* latin */
				@font-face {
					font-family: 'Fira Sans';
					font-style: normal;
					font-weight: 400;
					src: local('Fira Sans Regular'), local('FiraSans-Regular'),
						url(https://fonts.gstatic.com/s/firasans/v10/va9E4kDNxMZdWfMOD5Vvl4jLazX3dA.woff2)
							format('woff2');
					unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC,
						U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF,
						U+FFFD;
				}
				/* cyrillic-ext */
				@font-face {
					font-family: 'Fira Sans';
					font-style: normal;
					font-weight: 500;
					src: local('Fira Sans Medium'), local('FiraSans-Medium'),
						url(https://fonts.gstatic.com/s/firasans/v10/va9B4kDNxMZdWfMOD5VnZKveSxf6Xl7Gl3LX.woff2)
							format('woff2');
					unicode-range: U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F,
						U+FE2E-FE2F;
				}
				/* cyrillic */
				@font-face {
					font-family: 'Fira Sans';
					font-style: normal;
					font-weight: 500;
					src: local('Fira Sans Medium'), local('FiraSans-Medium'),
						url(https://fonts.gstatic.com/s/firasans/v10/va9B4kDNxMZdWfMOD5VnZKveQhf6Xl7Gl3LX.woff2)
							format('woff2');
					unicode-range: U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;
				}
				/* latin-ext */
				@font-face {
					font-family: 'Fira Sans';
					font-style: normal;
					font-weight: 500;
					src: local('Fira Sans Medium'), local('FiraSans-Medium'),
						url(https://fonts.gstatic.com/s/firasans/v10/va9B4kDNxMZdWfMOD5VnZKveSBf6Xl7Gl3LX.woff2)
							format('woff2');
					unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF,
						U+2113, U+2C60-2C7F, U+A720-A7FF;
				}
				/* latin */
				@font-face {
					font-family: 'Fira Sans';
					font-style: normal;
					font-weight: 500;
					src: local('Fira Sans Medium'), local('FiraSans-Medium'),
						url(https://fonts.gstatic.com/s/firasans/v10/va9B4kDNxMZdWfMOD5VnZKveRhf6Xl7Glw.woff2)
							format('woff2');
					unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC,
						U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF,
						U+FFFD;
				}
				/* cyrillic-ext */
				@font-face {
					font-family: 'Fira Sans';
					font-style: normal;
					font-weight: 700;
					src: local('Fira Sans Bold'), local('FiraSans-Bold'),
						url(https://fonts.gstatic.com/s/firasans/v10/va9B4kDNxMZdWfMOD5VnLK3eSxf6Xl7Gl3LX.woff2)
							format('woff2');
					unicode-range: U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F,
						U+FE2E-FE2F;
				}
				/* cyrillic */
				@font-face {
					font-family: 'Fira Sans';
					font-style: normal;
					font-weight: 700;
					src: local('Fira Sans Bold'), local('FiraSans-Bold'),
						url(https://fonts.gstatic.com/s/firasans/v10/va9B4kDNxMZdWfMOD5VnLK3eQhf6Xl7Gl3LX.woff2)
							format('woff2');
					unicode-range: U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;
				}
				/* latin-ext */
				@font-face {
					font-family: 'Fira Sans';
					font-style: normal;
					font-weight: 700;
					src: local('Fira Sans Bold'), local('FiraSans-Bold'),
						url(https://fonts.gstatic.com/s/firasans/v10/va9B4kDNxMZdWfMOD5VnLK3eSBf6Xl7Gl3LX.woff2)
							format('woff2');
					unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF,
						U+2113, U+2C60-2C7F, U+A720-A7FF;
				}
				/* latin */
				@font-face {
					font-family: 'Fira Sans';
					font-style: normal;
					font-weight: 700;
					src: local('Fira Sans Bold'), local('FiraSans-Bold'),
						url(https://fonts.gstatic.com/s/firasans/v10/va9B4kDNxMZdWfMOD5VnLK3eRhf6Xl7Glw.woff2)
							format('woff2');
					unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC,
						U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF,
						U+FFFD;
				}
				/* cyrillic-ext */
				@font-face {
					font-family: 'Fira Sans';
					font-style: normal;
					font-weight: 800;
					font-display: swap;
					src: local('Fira Sans ExtraBold'), local('FiraSans-ExtraBold'),
						url(https://fonts.gstatic.com/s/firasans/v10/va9B4kDNxMZdWfMOD5VnMK7eSxf6Xl7Gl3LX.woff2)
							format('woff2');
					unicode-range: U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F,
						U+FE2E-FE2F;
				}
				/* cyrillic */
				@font-face {
					font-family: 'Fira Sans';
					font-style: normal;
					font-weight: 800;
					font-display: swap;
					src: local('Fira Sans ExtraBold'), local('FiraSans-ExtraBold'),
						url(https://fonts.gstatic.com/s/firasans/v10/va9B4kDNxMZdWfMOD5VnMK7eQhf6Xl7Gl3LX.woff2)
							format('woff2');
					unicode-range: U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;
				}
				/* latin-ext */
				@font-face {
					font-family: 'Fira Sans';
					font-style: normal;
					font-weight: 800;
					font-display: swap;
					src: local('Fira Sans ExtraBold'), local('FiraSans-ExtraBold'),
						url(https://fonts.gstatic.com/s/firasans/v10/va9B4kDNxMZdWfMOD5VnMK7eSBf6Xl7Gl3LX.woff2)
							format('woff2');
					unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF,
						U+2113, U+2C60-2C7F, U+A720-A7FF;
				}
				/* latin */
				@font-face {
					font-family: 'Fira Sans';
					font-style: normal;
					font-weight: 800;
					font-display: swap;
					src: local('Fira Sans ExtraBold'), local('FiraSans-ExtraBold'),
						url(https://fonts.gstatic.com/s/firasans/v10/va9B4kDNxMZdWfMOD5VnMK7eRhf6Xl7Glw.woff2)
							format('woff2');
					unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC,
						U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF,
						U+FFFD;
				}
			}
		</style>
		<!--<![endif]-->
		<style>
			html,
			body {
				margin: 0 !important;
				padding: 0 !important;
				min-height: 100% !important;
				width: 100% !important;
				-webkit-font-smoothing: antialiased;
			}

			* {
				-ms-text-size-adjust: 100%;
			}

			#outlook a {
				padding: 0;
			}

			.ReadMsgBody,
			.ExternalClass {
				width: 100%;
			}

			.ExternalClass,
			.ExternalClass p,
			.ExternalClass td,
			.ExternalClass div,
			.ExternalClass span,
			.ExternalClass font {
				line-height: 100%;
			}

			div[style*='margin: 14px 0'],
			div[style*='margin: 16px 0'] {
				margin: 0 !important;
			}

			table,
			td,
			th {
				mso-table-lspace: 0 !important;
				mso-table-rspace: 0 !important;
				border-collapse: collapse;
			}

			body,
			td,
			th,
			p,
			div,
			li,
			a,
			span {
				-webkit-text-size-adjust: 100%;
				-ms-text-size-adjust: 100%;
				mso-line-height-rule: exactly;
			}

			img {
				border: 0;
				outline: none;
				line-height: 100%;
				text-decoration: none;
				-ms-interpolation-mode: bicubic;
			}

			a[x-apple-data-detectors] {
				color: inherit !important;
				text-decoration: none !important;
			}

			.pc-gmail-fix {
				display: none;
				display: none !important;
			}

			/* .pc-lg-hide {
             display: none;
         } */

			@media (min-width: 621px) {
				.pc-lg-hide {
					display: none;
				}

				.pc-lg-bg-img-hide {
					background-image: none !important;
				}
			}
		</style>
		<style>
			@media (max-width: 620px) {
				.pc-project-body {
					min-width: 0px !important;
				}
				.pc-project-container {
					width: 100% !important;
				}
				.pc-sm-hide {
					display: none !important;
				}
				.pc-sm-bg-img-hide {
					background-image: none !important;
				}
				.pc-w620-padding-25-35-0-35 {
					padding: 25px 35px 0px 35px !important;
				}
				.pc-w620-padding-15-35-0-35 {
					padding: 15px 35px 0px 35px !important;
				}
				.pc-w620-padding-0-10 {
					padding-left: 5px !important;
					padding-right: 5px !important;
				}
				.pc-w620-padding-146-39-141-39 {
					padding: 146px 39px 141px 39px !important;
				}
				.pc-w620-fontSize-30 {
					font-size: 30px !important;
				}
				.pc-w620-lineHeight-40 {
					line-height: 40px !important;
				}
				.pc-w620-fontSize-16 {
					font-size: 16px !important;
				}
				.pc-w620-lineHeight-28 {
					line-height: 28px !important;
				}
				.pc-w620-padding-35-35-35-35 {
					padding: 35px 35px 35px 35px !important;
				}
				.pc-w620-lineHeight-26 {
					line-height: 26px !important;
				}
				.pc-w620-padding-30-0 {
					padding-top: 15px !important;
					padding-bottom: 15px !important;
				}
				.pc-w620-padding-40-0 {
					padding-top: 20px !important;
					padding-bottom: 20px !important;
				}
				table.pc-w620-spacing-0-0-22-0 {
					margin: 0px 0px 22px 0px !important;
				}
				td.pc-w620-spacing-0-0-22-0,
				th.pc-w620-spacing-0-0-22-0 {
					margin: 0 !important;
					padding: 0px 0px 22px 0px !important;
				}
				table.pc-w620-spacing-0-0-25-0 {
					margin: 0px 0px 25px 0px !important;
				}
				td.pc-w620-spacing-0-0-25-0,
				th.pc-w620-spacing-0-0-25-0 {
					margin: 0 !important;
					padding: 0px 0px 25px 0px !important;
				}

				.pc-w620-gridCollapsed-1 > tbody,
				.pc-w620-gridCollapsed-1 > tbody > tr,
				.pc-w620-gridCollapsed-1 > tr {
					display: inline-block !important;
				}
				.pc-w620-gridCollapsed-1.pc-width-fill > tbody,
				.pc-w620-gridCollapsed-1.pc-width-fill > tbody > tr,
				.pc-w620-gridCollapsed-1.pc-width-fill > tr {
					width: 100% !important;
				}
				.pc-w620-gridCollapsed-1.pc-w620-width-fill > tbody,
				.pc-w620-gridCollapsed-1.pc-w620-width-fill > tbody > tr,
				.pc-w620-gridCollapsed-1.pc-w620-width-fill > tr {
					width: 100% !important;
				}
				.pc-w620-gridCollapsed-1 > tbody > tr > td,
				.pc-w620-gridCollapsed-1 > tr > td {
					display: block !important;
					width: auto !important;
					padding-left: 0 !important;
					padding-right: 0 !important;
				}
				.pc-w620-gridCollapsed-1.pc-width-fill > tbody > tr > td,
				.pc-w620-gridCollapsed-1.pc-width-fill > tr > td {
					width: 100% !important;
				}
				.pc-w620-gridCollapsed-1.pc-w620-width-fill > tbody > tr > td,
				.pc-w620-gridCollapsed-1.pc-w620-width-fill > tr > td {
					width: 100% !important;
				}
				.pc-w620-gridCollapsed-1 > tbody > .pc-grid-tr-first > .pc-grid-td-first,
				pc-w620-gridCollapsed-1 > .pc-grid-tr-first > .pc-grid-td-first {
					padding-top: 0 !important;
				}
				.pc-w620-gridCollapsed-1 > tbody > .pc-grid-tr-last > .pc-grid-td-last,
				pc-w620-gridCollapsed-1 > .pc-grid-tr-last > .pc-grid-td-last {
					padding-bottom: 0 !important;
				}

				.pc-w620-gridCollapsed-0 > tbody > .pc-grid-tr-first > td,
				.pc-w620-gridCollapsed-0 > .pc-grid-tr-first > td {
					padding-top: 0 !important;
				}
				.pc-w620-gridCollapsed-0 > tbody > .pc-grid-tr-last > td,
				.pc-w620-gridCollapsed-0 > .pc-grid-tr-last > td {
					padding-bottom: 0 !important;
				}
				.pc-w620-gridCollapsed-0 > tbody > tr > .pc-grid-td-first,
				.pc-w620-gridCollapsed-0 > tr > .pc-grid-td-first {
					padding-left: 0 !important;
				}
				.pc-w620-gridCollapsed-0 > tbody > tr > .pc-grid-td-last,
				.pc-w620-gridCollapsed-0 > tr > .pc-grid-td-last {
					padding-right: 0 !important;
				}

				.pc-w620-tableCollapsed-1 > tbody,
				.pc-w620-tableCollapsed-1 > tbody > tr,
				.pc-w620-tableCollapsed-1 > tr {
					display: block !important;
				}
				.pc-w620-tableCollapsed-1.pc-width-fill > tbody,
				.pc-w620-tableCollapsed-1.pc-width-fill > tbody > tr,
				.pc-w620-tableCollapsed-1.pc-width-fill > tr {
					width: 100% !important;
				}
				.pc-w620-tableCollapsed-1.pc-w620-width-fill > tbody,
				.pc-w620-tableCollapsed-1.pc-w620-width-fill > tbody > tr,
				.pc-w620-tableCollapsed-1.pc-w620-width-fill > tr {
					width: 100% !important;
				}
				.pc-w620-tableCollapsed-1 > tbody > tr > td,
				.pc-w620-tableCollapsed-1 > tr > td {
					display: block !important;
					width: auto !important;
				}
				.pc-w620-tableCollapsed-1.pc-width-fill > tbody > tr > td,
				.pc-w620-tableCollapsed-1.pc-width-fill > tr > td {
					width: 100% !important;
				}
				.pc-w620-tableCollapsed-1.pc-w620-width-fill > tbody > tr > td,
				.pc-w620-tableCollapsed-1.pc-w620-width-fill > tr > td {
					width: 100% !important;
				}
			}
			@media (max-width: 520px) {
				.pc-w520-padding-25-30-0-30 {
					padding: 25px 30px 0px 30px !important;
				}
				.pc-w520-padding-15-30-0-30 {
					padding: 15px 30px 0px 30px !important;
				}
				.pc-w520-padding-106-34-101-34 {
					padding: 106px 34px 101px 34px !important;
				}
				.pc-w520-padding-30-30-30-30 {
					padding: 30px 30px 30px 30px !important;
				}
			}
		</style>
		<!--[if !mso]><!-- -->
		<style>
			@media all {
				@font-face {
					font-family: 'Fira Sans';
					font-style: normal;
					font-weight: 100;
					src: url('https://fonts.gstatic.com/s/firasans/v17/va9C4kDNxMZdWfMOD5Vn9LjHYTQ.woff')
							format('woff'),
						url('https://fonts.gstatic.com/s/firasans/v17/va9C4kDNxMZdWfMOD5Vn9LjHYTI.woff2')
							format('woff2');
				}
				@font-face {
					font-family: 'Fira Sans';
					font-style: italic;
					font-weight: 100;
					src: url('https://fonts.gstatic.com/s/firasans/v17/va9A4kDNxMZdWfMOD5VvkrCqUT7fdw.woff')
							format('woff'),
						url('https://fonts.gstatic.com/s/firasans/v17/va9A4kDNxMZdWfMOD5VvkrCqUT7fcQ.woff2')
							format('woff2');
				}
				@font-face {
					font-family: 'Fira Sans';
					font-style: normal;
					font-weight: 200;
					src: url('https://fonts.gstatic.com/s/firasans/v17/va9B4kDNxMZdWfMOD5VnWKneSBf8.woff')
							format('woff'),
						url('https://fonts.gstatic.com/s/firasans/v17/va9B4kDNxMZdWfMOD5VnWKneSBf6.woff2')
							format('woff2');
				}
				@font-face {
					font-family: 'Fira Sans';
					font-style: italic;
					font-weight: 200;
					src: url('https://fonts.gstatic.com/s/firasans/v17/va9f4kDNxMZdWfMOD5VvkrAGQCf2VF8.woff')
							format('woff'),
						url('https://fonts.gstatic.com/s/firasans/v17/va9f4kDNxMZdWfMOD5VvkrAGQCf2VFk.woff2')
							format('woff2');
				}
				@font-face {
					font-family: 'Fira Sans';
					font-style: normal;
					font-weight: 300;
					src: url('https://fonts.gstatic.com/s/firasans/v17/va9B4kDNxMZdWfMOD5VnPKreSBf8.woff')
							format('woff'),
						url('https://fonts.gstatic.com/s/firasans/v17/va9B4kDNxMZdWfMOD5VnPKreSBf6.woff2')
							format('woff2');
				}
				@font-face {
					font-family: 'Fira Sans';
					font-style: italic;
					font-weight: 300;
					src: url('https://fonts.gstatic.com/s/firasans/v17/va9f4kDNxMZdWfMOD5VvkrBiQyf2VF8.woff')
							format('woff'),
						url('https://fonts.gstatic.com/s/firasans/v17/va9f4kDNxMZdWfMOD5VvkrBiQyf2VFk.woff2')
							format('woff2');
				}
				@font-face {
					font-family: 'Fira Sans';
					font-style: normal;
					font-weight: 400;
					src: url('https://fonts.gstatic.com/s/firasans/v17/va9E4kDNxMZdWfMOD5VvmYjN.woff')
							format('woff'),
						url('https://fonts.gstatic.com/s/firasans/v17/va9E4kDNxMZdWfMOD5VvmYjL.woff2')
							format('woff2');
				}
				@font-face {
					font-family: 'Fira Sans';
					font-style: italic;
					font-weight: 400;
					src: url('https://fonts.gstatic.com/s/firasans/v17/va9C4kDNxMZdWfMOD5VvkrjHYTQ.woff')
							format('woff'),
						url('https://fonts.gstatic.com/s/firasans/v17/va9C4kDNxMZdWfMOD5VvkrjHYTI.woff2')
							format('woff2');
				}
				@font-face {
					font-family: 'Fira Sans';
					font-style: normal;
					font-weight: 500;
					src: url('https://fonts.gstatic.com/s/firasans/v17/va9B4kDNxMZdWfMOD5VnZKveSBf8.woff')
							format('woff'),
						url('https://fonts.gstatic.com/s/firasans/v17/va9B4kDNxMZdWfMOD5VnZKveSBf6.woff2')
							format('woff2');
				}
				@font-face {
					font-family: 'Fira Sans';
					font-style: italic;
					font-weight: 500;
					src: url('https://fonts.gstatic.com/s/firasans/v17/va9f4kDNxMZdWfMOD5VvkrA6Qif2VF8.woff')
							format('woff'),
						url('https://fonts.gstatic.com/s/firasans/v17/va9f4kDNxMZdWfMOD5VvkrA6Qif2VFk.woff2')
							format('woff2');
				}
				@font-face {
					font-family: 'Fira Sans';
					font-style: normal;
					font-weight: 600;
					src: url('https://fonts.gstatic.com/s/firasans/v17/va9B4kDNxMZdWfMOD5VnSKzeSBf8.woff')
							format('woff'),
						url('https://fonts.gstatic.com/s/firasans/v17/va9B4kDNxMZdWfMOD5VnSKzeSBf6.woff2')
							format('woff2');
				}
				@font-face {
					font-family: 'Fira Sans';
					font-style: italic;
					font-weight: 600;
					src: url('https://fonts.gstatic.com/s/firasans/v17/va9f4kDNxMZdWfMOD5VvkrAWRSf2VF8.woff')
							format('woff'),
						url('https://fonts.gstatic.com/s/firasans/v17/va9f4kDNxMZdWfMOD5VvkrAWRSf2VFk.woff2')
							format('woff2');
				}
				@font-face {
					font-family: 'Fira Sans';
					font-style: normal;
					font-weight: 700;
					src: url('https://fonts.gstatic.com/s/firasans/v17/va9B4kDNxMZdWfMOD5VnLK3eSBf8.woff')
							format('woff'),
						url('https://fonts.gstatic.com/s/firasans/v17/va9B4kDNxMZdWfMOD5VnLK3eSBf6.woff2')
							format('woff2');
				}
				@font-face {
					font-family: 'Fira Sans';
					font-style: normal;
					font-weight: 800;
					src: url('https://fonts.gstatic.com/s/firasans/v17/va9B4kDNxMZdWfMOD5VnMK7eSBf8.woff')
							format('woff'),
						url('https://fonts.gstatic.com/s/firasans/v17/va9B4kDNxMZdWfMOD5VnMK7eSBf6.woff2')
							format('woff2');
				}
				@font-face {
					font-family: 'Fira Sans';
					font-style: italic;
					font-weight: 800;
					src: url('https://fonts.gstatic.com/s/firasans/v17/va9f4kDNxMZdWfMOD5VvkrBuRyf2VF8.woff')
							format('woff'),
						url('https://fonts.gstatic.com/s/firasans/v17/va9f4kDNxMZdWfMOD5VvkrBuRyf2VFk.woff2')
							format('woff2');
				}
				@font-face {
					font-family: 'Fira Sans';
					font-style: italic;
					font-weight: 700;
					src: url('https://fonts.gstatic.com/s/firasans/v17/va9f4kDNxMZdWfMOD5VvkrByRCf2VF8.woff')
							format('woff'),
						url('https://fonts.gstatic.com/s/firasans/v17/va9f4kDNxMZdWfMOD5VvkrByRCf2VFk.woff2')
							format('woff2');
				}
				@font-face {
					font-family: 'Fira Sans';
					font-style: normal;
					font-weight: 900;
					src: url('https://fonts.gstatic.com/s/firasans/v17/va9B4kDNxMZdWfMOD5VnFK_eSBf8.woff')
							format('woff'),
						url('https://fonts.gstatic.com/s/firasans/v17/va9B4kDNxMZdWfMOD5VnFK_eSBf6.woff2')
							format('woff2');
				}
				@font-face {
					font-family: 'Fira Sans';
					font-style: italic;
					font-weight: 900;
					src: url('https://fonts.gstatic.com/s/firasans/v17/va9f4kDNxMZdWfMOD5VvkrBKRif2VF8.woff')
							format('woff'),
						url('https://fonts.gstatic.com/s/firasans/v17/va9f4kDNxMZdWfMOD5VvkrBKRif2VFk.woff2')
							format('woff2');
				}
			}
		</style>
		<!--<![endif]-->
		<!--[if mso]>
			<style type="text/css">
				.pc-font-alt {
					font-family: Arial, Helvetica, sans-serif !important;
				}
			</style>
		<![endif]-->
		<!--[if gte mso 9]>
			<xml>
				<o:OfficeDocumentSettings>
					<o:AllowPNG />
					<o:PixelsPerInch>96</o:PixelsPerInch>
				</o:OfficeDocumentSettings>
			</xml>
		<![endif]-->
	</head>

	<body
		class="pc-font-alt"
		style="
			width: 100% !important;
			min-height: 100% !important;
			margin: 0 !important;
			padding: 0 !important;
			line-height: 1.5;
			color: #2d3a41;
			mso-line-height-rule: exactly;
			-webkit-font-smoothing: antialiased;
			-webkit-text-size-adjust: 100%;
			-ms-text-size-adjust: 100%;
			font-variant-ligatures: none;
			text-rendering: optimizeLegibility;
			-moz-osx-font-smoothing: grayscale;
			background-color: #f4f4f4;
		"
		bgcolor="#f4f4f4"
	>
		<table
			class="pc-project-body"
			style="table-layout: fixed; min-width: 600px; background-color: #f4f4f4"
			bgcolor="#f4f4f4"
			width="100%"
			border="0"
			cellspacing="0"
			cellpadding="0"
			role="presentation"
		>
			<tr>
				<td align="center" valign="top">
					<table
						class="pc-project-container"
						style="width: 600px; max-width: 600px"
						width="600"
						align="center"
						border="0"
						cellpadding="0"
						cellspacing="0"
						role="presentation"
					>
						<tr>
							<td style="padding: 20px 0px 20px 0px" align="left" valign="top">
								<table
									border="0"
									cellpadding="0"
									cellspacing="0"
									role="presentation"
									width="100%"
									style="width: 100%"
								>
									<tr>
										<td valign="top">
											<!-- BEGIN MODULE: Title -->
											<table
												width="100%"
												border="0"
												cellspacing="0"
												cellpadding="0"
												role="presentation"
											>
												<tr>
													<td style="padding: 0px 0px 0px 0px">
														<table
															width="100%"
															border="0"
															cellspacing="0"
															cellpadding="0"
															role="presentation"
														>
															<tr>
																<td
																	valign="top"
																	class="pc-w520-padding-25-30-0-30 pc-w620-padding-25-35-0-35"
																	style="
																		padding: 25px 40px 0px 40px;
																		border-radius: 0px;
																		background-color: #ffffff;
																	"
																	bgcolor="#ffffff"
																>
																	<table
																		border="0"
																		cellpadding="0"
																		cellspacing="0"
																		role="presentation"
																		align="center"
																		style="margin-right: auto; margin-left: auto"
																	>
																		<tr>
																			<td
																				valign="top"
																				class="pc-font-alt"
																				align="center"
																				style="
																					mso-line-height: exactly;
																					line-height: 131%;
																					font-family: 'Fira Sans', Helvetica,
																						Arial, sans-serif;
																					font-size: 32px;
																					font-weight: bold;
																					color: #434343;
																					text-align: center;
																					text-align-last: center;
																				"
																			>
																				<div><span>DeskMate</span></div>
																			</td>
																		</tr>
																	</table>
																</td>
															</tr>
														</table>
													</td>
												</tr>
											</table>
											<!-- END MODULE: Title -->
										</td>
									</tr>
									<tr>
										<td valign="top">
											<!-- BEGIN MODULE: Subtitle -->
											<table
												width="100%"
												border="0"
												cellspacing="0"
												cellpadding="0"
												role="presentation"
											>
												<tr>
													<td style="padding: 0px 0px 0px 0px">
														<table
															width="100%"
															border="0"
															cellspacing="0"
															cellpadding="0"
															role="presentation"
														>
															<tr>
																<td
																	valign="top"
																	class="pc-w520-padding-15-30-0-30 pc-w620-padding-15-35-0-35"
																	style="
																		padding: 15px 40px 0px 40px;
																		border-radius: 0px;
																		background-color: #ffffff;
																	"
																	bgcolor="#ffffff"
																>
																	<table
																		border="0"
																		cellpadding="0"
																		cellspacing="0"
																		role="presentation"
																		align="center"
																		style="margin-right: auto; margin-left: auto"
																	>
																		<tr>
																			<td
																				valign="top"
																				class="pc-font-alt"
																				align="center"
																				style="
																					mso-line-height: exactly;
																					line-height: 133%;
																					font-family: 'Fira Sans', Helvetica,
																						Arial, sans-serif;
																					font-size: 18px;
																					font-weight: 500;
																					color: #434343;
																					text-align: center;
																					text-align-last: center;
																				"
																			>
																				<div>
																					<span
																						>Your personal support desk
																						buddy</span
																					>
																				</div>
																			</td>
																		</tr>
																	</table>
																</td>
															</tr>
														</table>
													</td>
												</tr>
											</table>
											<!-- END MODULE: Subtitle -->
										</td>
									</tr>
									<tr>
										<td valign="top">
											<!-- BEGIN MODULE: Header 3 -->
											<table
												width="100%"
												border="0"
												cellspacing="0"
												cellpadding="0"
												role="presentation"
											>
												<tr>
													<td style="padding: 0px 0px 0px 0px">
														<table
															width="100%"
															border="0"
															cellspacing="0"
															cellpadding="0"
															role="presentation"
														>
															<tr>
																<td
																	valign="top"
																	class="pc-w520-padding-30-30-30-30 pc-w620-padding-35-35-35-35"
																	style="
																		padding: 40px 40px 40px 40px;
																		border-radius: 0px;
																		background-color: #ffffff;
																	"
																	bgcolor="#ffffff"
																>
																	<table
																		width="100%"
																		border="0"
																		cellpadding="0"
																		cellspacing="0"
																		role="presentation"
																	>
																		<tr>
																			<td
																				align="center"
																				style="padding: 0px 0px 23px 0px"
																			>
																				<table
																					class="pc-width-hug pc-w620-gridCollapsed-0"
																					align="center"
																					border="0"
																					cellpadding="0"
																					cellspacing="0"
																					role="presentation"
																				>
																					<tr
																						class="pc-grid-tr-first pc-grid-tr-last"
																					>
																						<td
																							class="pc-grid-td-first pc-w620-padding-0-10"
																							valign="top"
																							style="
																								padding-top: 0px;
																								padding-right: 10px;
																								padding-bottom: 0px;
																								padding-left: 0px;
																							"
																						>
																							<table
																								border="0"
																								cellpadding="0"
																								cellspacing="0"
																								role="presentation"
																							>
																								<tr>
																									<td
																										align="center"
																										valign="top"
																									>
																										<table
																											align="center"
																											border="0"
																											cellpadding="0"
																											cellspacing="0"
																											role="presentation"
																										>
																											<tr>
																												<td
																													align="center"
																													valign="top"
																												>
																													<table
																														border="0"
																														cellpadding="0"
																														cellspacing="0"
																														role="presentation"
																														align="center"
																														style="
																															margin-right: auto;
																															margin-left: auto;
																														"
																													>
																														<tr>
																															<td
																																valign="top"
																																align="left"
																															>
																																<div
																																	class="pc-font-alt"
																																	style="
																																		line-height: 121%;
																																		font-family: 'Fira Sans',
																																			Helvetica,
																																			Arial,
																																			sans-serif;
																																		font-size: 14px;
																																		font-weight: 500;
																																		color: #1b1b1b;
																																		text-align: left;
																																		text-align-last: left;
																																	"
																																>
																																	<div>
																																		<span
																																			>Signup</span
																																		>
																																	</div>
																																</div>
																															</td>
																														</tr>
																													</table>
																												</td>
																											</tr>
																										</table>
																									</td>
																								</tr>
																							</table>
																						</td>
																						<td
																							class="pc-w620-padding-0-10"
																							valign="top"
																							style="
																								padding-top: 0px;
																								padding-right: 10px;
																								padding-bottom: 0px;
																								padding-left: 10px;
																							"
																						>
																							<table
																								border="0"
																								cellpadding="0"
																								cellspacing="0"
																								role="presentation"
																							>
																								<tr>
																									<td
																										align="center"
																										valign="top"
																									>
																										<table
																											align="center"
																											border="0"
																											cellpadding="0"
																											cellspacing="0"
																											role="presentation"
																										>
																											<tr>
																												<td
																													align="center"
																													valign="top"
																												>
																													<table
																														border="0"
																														cellpadding="0"
																														cellspacing="0"
																														role="presentation"
																														align="center"
																														style="
																															margin-right: auto;
																															margin-left: auto;
																														"
																													>
																														<tr>
																															<td
																																valign="top"
																																align="left"
																															>
																																<div
																																	class="pc-font-alt"
																																	style="
																																		line-height: 121%;
																																		font-family: 'Fira Sans',
																																			Helvetica,
																																			Arial,
																																			sans-serif;
																																		font-size: 14px;
																																		font-weight: 500;
																																		color: #1b1b1b;
																																		text-align: left;
																																		text-align-last: left;
																																	"
																																>
																																	<div>
																																		<span
																																			>Login</span
																																		>
																																	</div>
																																</div>
																															</td>
																														</tr>
																													</table>
																												</td>
																											</tr>
																										</table>
																									</td>
																								</tr>
																							</table>
																						</td>
																						<td
																							class="pc-w620-padding-0-10"
																							valign="top"
																							style="
																								padding-top: 0px;
																								padding-right: 10px;
																								padding-bottom: 0px;
																								padding-left: 10px;
																							"
																						>
																							<table
																								border="0"
																								cellpadding="0"
																								cellspacing="0"
																								role="presentation"
																							>
																								<tr>
																									<td
																										align="center"
																										valign="top"
																									>
																										<table
																											align="center"
																											border="0"
																											cellpadding="0"
																											cellspacing="0"
																											role="presentation"
																										>
																											<tr>
																												<td
																													align="center"
																													valign="top"
																												>
																													<table
																														border="0"
																														cellpadding="0"
																														cellspacing="0"
																														role="presentation"
																														align="center"
																														style="
																															margin-right: auto;
																															margin-left: auto;
																														"
																													>
																														<tr>
																															<td
																																valign="top"
																																align="left"
																															>
																																<div
																																	class="pc-font-alt"
																																	style="
																																		line-height: 121%;
																																		font-family: 'Fira Sans',
																																			Helvetica,
																																			Arial,
																																			sans-serif;
																																		font-size: 14px;
																																		font-weight: 500;
																																		color: #1b1b1b;
																																		text-align: left;
																																		text-align-last: left;
																																	"
																																>
																																	<div>
																																		<span
																																			>Home</span
																																		>
																																	</div>
																																</div>
																															</td>
																														</tr>
																													</table>
																												</td>
																											</tr>
																										</table>
																									</td>
																								</tr>
																							</table>
																						</td>
																						<td
																							class="pc-grid-td-last pc-w620-padding-0-10"
																							valign="top"
																							style="
																								padding-top: 0px;
																								padding-right: 0px;
																								padding-bottom: 0px;
																								padding-left: 10px;
																							"
																						>
																							<table
																								border="0"
																								cellpadding="0"
																								cellspacing="0"
																								role="presentation"
																							>
																								<tr>
																									<td
																										align="center"
																										valign="top"
																									>
																										<table
																											align="center"
																											border="0"
																											cellpadding="0"
																											cellspacing="0"
																											role="presentation"
																										>
																											<tr>
																												<td
																													align="center"
																													valign="top"
																												>
																													<table
																														border="0"
																														cellpadding="0"
																														cellspacing="0"
																														role="presentation"
																														align="center"
																														style="
																															margin-right: auto;
																															margin-left: auto;
																														"
																													>
																														<tr>
																															<td
																																valign="top"
																																align="left"
																															>
																																<div
																																	class="pc-font-alt"
																																	style="
																																		line-height: 121%;
																																		font-family: 'Fira Sans',
																																			Helvetica,
																																			Arial,
																																			sans-serif;
																																		font-size: 14px;
																																		font-weight: 500;
																																		color: #1b1b1b;
																																		text-align: left;
																																		text-align-last: left;
																																	"
																																>
																																	<div>
																																		<span
																																			>Contact</span
																																		>
																																	</div>
																																</div>
																															</td>
																														</tr>
																													</table>
																												</td>
																											</tr>
																										</table>
																									</td>
																								</tr>
																							</table>
																						</td>
																					</tr>
																				</table>
																			</td>
																		</tr>
																	</table>
																	<table
																		width="100%"
																		border="0"
																		cellpadding="0"
																		cellspacing="0"
																		role="presentation"
																	>
																		<tr>
																			<td>
																				<table
																					class="pc-width-fill pc-w620-gridCollapsed-0"
																					width="100%"
																					border="0"
																					cellpadding="0"
																					cellspacing="0"
																					role="presentation"
																				>
																					<tr
																						class="pc-grid-tr-first pc-grid-tr-last"
																					>
																						<td
																							class="pc-grid-td-first pc-grid-td-last"
																							align="center"
																							valign="top"
																							style="
																								padding-top: 0px;
																								padding-right: 0px;
																								padding-bottom: 0px;
																								padding-left: 0px;
																							"
																						>
																							<table
																								width="100%"
																								border="0"
																								cellpadding="0"
																								cellspacing="0"
																								role="presentation"
																								style="width: 100%"
																							>
																								<tr>
																									<!--[if !gte mso 9]><!-->
																									<td
																										class="pc-w520-padding-106-34-101-34 pc-w620-padding-146-39-141-39"
																										align="center"
																										valign="middle"
																										background="https://cloudfilesdm.com/postcards/image-1701342095906.png"
																										style="
																											padding: 186px 44px
																												181px 44px;
																											background-size: cover;
																											background-position: 50%
																												0;
																											background-repeat: no-repeat;
																											background-color: #1b1b1b;
																											border-radius: 8px;
																										"
																									>
																										<!--<![endif]-->
																										<!--[if gte mso 9]>
                <td class="pc-w520-padding-106-34-101-34 pc-w620-padding-146-39-141-39"    align="center"   valign="middle"  background="https://cloudfilesdm.com/postcards/image-1701342095906.png" style="background-size: cover; background-position: 50% 0; background-repeat: no-repeat; background-color:#1b1b1b; border-radius: 8px;">
            <![endif]-->
																										<!--[if gte mso 9]>
                <v:rect xmlns:v="urn:schemas-microsoft-com:vml" fill="true" stroke="false" style="width: 520px;">
                    <v:fill src="https://lh3.googleusercontent.com/pw/ABLVV84MNAqZUJ9dZIDEJYfxOFp3fO92efrDB858bmMCNBO4H9Mol4WQR7wRHVN2iLx_4PD7z_xMjh4P1mv_QV4IEkIEsLwRBlCkG8byGDaez-PW_8OAFzFpD2h3TxVRPjqaHVuCZn6Ypd5-QM8jFUtHM3VQbNtgRvIOP54nhnXUBCo-3V-sa8ihg55SpMcJCTX0QU-O-sa4NawMuXCh_1DyA4t0UCdVk79g2NrVETLdOHjmMcxE9J2IvT7or6kwSo66Bb8eVT8KGM3BfVLKWAVSndnfSHC3PLizm641Lcs9PvsuFeQJ6l7KksXhRh5afG2bwaP2IDUpTz6-EII0ZALmSWr6lc27dHNrS_6gdW7rIsN5eiQ5cwwU5Gyu_CZDwrO0jDYL2_ZwP-p1ed5oANp70yaOYMhSWdtVP5Njhz8_n9ri1SL8AEfHdHqPOFfw53AzzQcaKVqkA__P0LbAws4-alicXrH2G0h6puWK8vvTVXKBrOdtM0NOlUtIbyTz3MuKNZHb47u2N8AACnj63VcJneWS3CWDqA2GhLERw8rWZxJohbTa917V4jr41LAX0kBr2TlINW29bePgpUQdpw15kWeu3uCviAtasJkS-_M8HurWAoV42YafczyhMJPxm7MFkYJn_LjmRPXV06AlM9B7L3mkv2MXEGuxYLnoCbz90y0fD1hvJQ4mzP-SxvAFux7YiV3Ow2Zo_x1N-FmiYv1Kl43uVxJqtONFw71IHgFKjWqaCKVwDgL_T5N9Jn-MmYaf9Ts7QjPTQRCAZ7cOK8CWr0P5yhBuQ4HPmlEvBj_2Q7F8cRKWXQ-FunIcvdizRTMgf5ljwM78CwHx4GEMCz-GOFtZ7e2OWRQ7RNAUA3tQT22-DuHrcqRWHMccqZGcA12MX0iXFYfBnsNRM6WXBarr6IGSj5cT-WOq8JlBKiZ33xLCCzTIlx8W8m1Uc1aN7U7k2K8erhp13ExTfkeIsa7mLeMMqG3BNw7BMzgzUW5floac584fg728oSSjFVkDCtcLGH7I9cONJl_fNMZE-O8fDjTHvWM92hKQNW9t_KYXKRNADsJBaqnH3ek=w973-h973-s-no?authuser=0" color="#1b1b1b" type="frame" size="1,1" aspect="atleast" origin="-0.5,-0.5" position="-0.5,-0.5"/>
                    <v:textbox style="mso-fit-shape-to-text: true;" inset="0,0,0,0">
                        <div style="font-size: 0; line-height: 0;">
                            <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" align="center">
                                <tr>
                                    <td style="font-size: 14px; line-height: 1.5;" valign="top">
                                        <table width="100%" border="0" cellspacing="0" cellpadding="0" role="presentation">
                                            <tr>
                                                <td colspan="3" height="186" style="line-height: 1px; font-size: 1px;">&nbsp;</td>
                                            </tr>
                                            <tr>
                                                <td width="44" valign="top" style="line-height: 1px; font-size: 1px;">&nbsp;</td>
                                                <td valign="top" align="left">
                <![endif]-->
																										<table
																											align="center"
																											width="100%"
																											border="0"
																											cellpadding="0"
																											cellspacing="0"
																											role="presentation"
																											style="width: 100%"
																										>
																											<tr>
																												<td
																													align="center"
																													valign="top"
																												>
																													<table
																														align="center"
																														border="0"
																														cellpadding="0"
																														cellspacing="0"
																														role="presentation"
																													>
																														<tr>
																															<td
																																valign="top"
																																style="
																																	padding: 0px
																																		0px
																																		10px
																																		0px;
																																"
																															>
																																<table
																																	border="0"
																																	cellpadding="0"
																																	cellspacing="0"
																																	role="presentation"
																																>
																																	<tr>
																																		<td
																																			valign="top"
																																			class="pc-font-alt pc-w620-fontSize-30 pc-w620-lineHeight-40"
																																			align="center"
																																			style="
																																				mso-line-height: exactly;
																																				line-height: 128%;
																																				letter-spacing: -0.6px;
																																				font-family: 'Fira Sans',
																																					Helvetica,
																																					Arial,
																																					sans-serif;
																																				font-size: 36px;
																																				font-weight: 800;
																																				color: #ffffff;
																																				text-align: center;
																																				text-align-last: center;
																																			"
																																		>
																																			<div>
																																				<span>
																																				</span>
																																			</div>
																																			<div>
																																				<span
																																					>&#xFEFF;</span
																																				>
																																			</div>
																																		</td>
																																	</tr>
																																</table>
																															</td>
																														</tr>
																													</table>
																												</td>
																											</tr>
																											<tr>
																												<td
																													align="center"
																													valign="top"
																												>
																													<table
																														align="center"
																														border="0"
																														cellpadding="0"
																														cellspacing="0"
																														role="presentation"
																													>
																														<tr>
																															<td
																																valign="top"
																																style="
																																	padding: 0px
																																		0px
																																		20px
																																		0px;
																																"
																															>
																																<table
																																	border="0"
																																	cellpadding="0"
																																	cellspacing="0"
																																	role="presentation"
																																>
																																	<tr>
																																		<td
																																			valign="top"
																																			class="pc-font-alt pc-w620-fontSize-16 pc-w620-lineHeight-28"
																																			align="center"
																																			style="
																																				mso-line-height: exactly;
																																				line-height: 156%;
																																				font-family: 'Fira Sans',
																																					Helvetica,
																																					Arial,
																																					sans-serif;
																																				font-size: 30px;
																																				font-weight: bold;
																																				font-style: italic;
																																				color: #80b0ff;
																																				text-transform: uppercase;
																																				text-align: center;
																																				text-align-last: center;
																																			"
																																		>
																																			<div>
																																				<span
																																					>DeskMate!
																																					Elevating
																																					Support,
																																					Simplifying
																																					Solutions</span
																																				>
																																			</div>
																																		</td>
																																	</tr>
																																</table>
																															</td>
																														</tr>
																													</table>
																												</td>
																											</tr>
																											<tr>
																												<td
																													align="center"
																													valign="top"
																												>
																													<table
																														align="center"
																														border="0"
																														cellpadding="0"
																														cellspacing="0"
																														role="presentation"
																													>
																														<tr>
																															<th
																																valign="top"
																																align="center"
																																style="
																																	font-weight: normal;
																																	line-height: 1;
																																"
																															>
																																<!--[if mso]>
																																	<table
																																		border="0"
																																		cellpadding="0"
																																		cellspacing="0"
																																		role="presentation"
																																		align="center"
																																		style="
																																			border-collapse: separate;
																																			margin-right: auto;
																																			margin-left: auto;
																																		"
																																	>
																																		<tr>
																																			<td
																																				valign="middle"
																																				align="center"
																																				style="
																																					text-align: center;
																																					color: #ffffff;
																																					border-radius: 8px;
																																					background-color: #2397e4;
																																					padding: 15px
																																						17px
																																						15px
																																						17px;
																																					mso-padding-left-alt: 0;
																																					margin-left: 17px;
																																				"
																																				bgcolor="#2397e4"
																																			>
																																				<a
																																					class="pc-font-alt"
																																					style="
																																						display: inline-block;
																																						text-decoration: none;
																																						white-space: nowrap;
																																						font-family: 'Fira Sans',
																																							Helvetica,
																																							Arial,
																																							sans-serif;
																																						font-weight: 500;
																																						font-size: 16px;
																																						line-height: 150%;
																																						color: #ffffff;
																																					"
																																					target="_blank"
																																					>Sign
																																					Up
																																					Now</a
																																				>
																																			</td>
																																		</tr>
																																	</table>
																																<![endif]-->
																																<!--[if !mso]><!-- --><a
																																	style="
																																		border-radius: 8px;
																																		background-color: #2397e4;
																																		padding: 15px
																																			17px
																																			15px
																																			17px;
																																		font-family: 'Fira Sans',
																																			Helvetica,
																																			Arial,
																																			sans-serif;
																																		font-weight: 500;
																																		font-size: 16px;
																																		line-height: 150%;
																																		color: #ffffff;
																																		display: inline-block;
																																		vertical-align: top;
																																		text-align: center;
																																		text-decoration: none;
																																		white-space: nowrap;
																																		-webkit-text-size-adjust: none;
																																	"
																																	target="_blank"
																																	>Sign
																																	Up
																																	Now</a
																																>
																																<!--<![endif]-->
																															</th>
																														</tr>
																													</table>
																												</td>
																											</tr>
																										</table>
																										<!--[if gte mso 9]>
                                                </td>
                                                <td width="44" style="line-height: 1px; font-size: 1px;" valign="top">&nbsp;</td>
                                            </tr>
                                            <tr>
                                                <td colspan="3" height="181" style="line-height: 1px; font-size: 1px;">&nbsp;</td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                        </div>
                        <p style="margin:0;mso-hide:all"><o:p xmlns:o="urn:schemas-microsoft-com:office:office">&nbsp;</o:p></p>
                    </v:textbox>
                </v:rect>
                <![endif]-->
																									</td>
																								</tr>
																							</table>
																						</td>
																					</tr>
																				</table>
																			</td>
																		</tr>
																	</table>
																</td>
															</tr>
														</table>
													</td>
												</tr>
											</table>
											<!-- END MODULE: Header 3 -->
										</td>
									</tr>
									<tr>
										<td valign="top">
											<!-- BEGIN MODULE: Content 13 -->
											<table
												width="100%"
												border="0"
												cellspacing="0"
												cellpadding="0"
												role="presentation"
											>
												<tr>
													<td style="padding: 0px 0px 0px 0px">
														<table
															width="100%"
															border="0"
															cellspacing="0"
															cellpadding="0"
															role="presentation"
														>
															<tr>
																<td
																	valign="top"
																	class="pc-w520-padding-30-30-30-30 pc-w620-padding-35-35-35-35"
																	style="
																		padding: 40px 40px 40px 40px;
																		border-radius: 0px;
																		background-color: #ffffff;
																	"
																	bgcolor="#ffffff"
																>
																	<table
																		width="100%"
																		border="0"
																		cellpadding="0"
																		cellspacing="0"
																		role="presentation"
																	>
																		<tr>
																			<td
																				align="center"
																				valign="top"
																				style="padding: 0px 0px 13px 0px"
																			>
																				<table
																					border="0"
																					cellpadding="0"
																					cellspacing="0"
																					role="presentation"
																					align="center"
																					style="
																						margin-right: auto;
																						margin-left: auto;
																					"
																				>
																					<tr>
																						<td
																							valign="top"
																							class="pc-font-alt"
																							align="center"
																							style="
																								mso-line-height: exactly;
																								line-height: 121%;
																								font-family: 'Fira Sans',
																									Helvetica, Arial,
																									sans-serif;
																								font-size: 14px;
																								font-weight: 500;
																								color: #40be65;
																								text-align: center;
																								text-align-last: center;
																							"
																						></td>
																					</tr>
																				</table>
																			</td>
																		</tr>
																	</table>
																	<table
																		width="100%"
																		border="0"
																		cellpadding="0"
																		cellspacing="0"
																		role="presentation"
																	>
																		<tr>
																			<td
																				align="center"
																				valign="top"
																				style="padding: 0px 0px 10px 0px"
																			>
																				<table
																					border="0"
																					cellpadding="0"
																					cellspacing="0"
																					role="presentation"
																					align="center"
																					style="
																						margin-right: auto;
																						margin-left: auto;
																					"
																				>
																					<tr>
																						<td valign="top" align="center">
																							<div
																								class="pc-font-alt"
																								style="
																									line-height: 142%;
																									letter-spacing: -0.4px;
																									font-family: 'Fira Sans',
																										Helvetica, Arial,
																										sans-serif;
																									font-size: 24px;
																									font-weight: bold;
																									color: #151515;
																									text-align: center;
																									text-align-last: center;
																								"
																							>
																								<div>
																									<span>${subject}</span>
																								</div>
																							</div>
																						</td>
																					</tr>
																				</table>
																			</td>
																		</tr>
																	</table>
																	<table
																		border="0"
																		cellpadding="0"
																		cellspacing="0"
																		role="presentation"
																		align="center"
																		style="margin-right: auto; margin-left: auto"
																	>
																		<tr>
																			<td valign="top" align="center">
																				<div
																					class="pc-font-alt"
																					style="
																						line-height: 156%;
																						letter-spacing: -0.2px;
																						font-family: 'Fira Sans',
																							Helvetica, Arial, sans-serif;
																						font-size: 18px;
																						font-weight: normal;
																						color: #9b9b9b;
																						text-align: center;
																						text-align-last: center;
																					"
																				>
																					<div><span>${text}</span></div>
																				</div>
																			</td>
																		</tr>
																	</table>
																</td>
															</tr>
														</table>
													</td>
												</tr>
											</table>
											<!-- END MODULE: Content 13 -->
										</td>
									</tr>
									<tr>
										<td valign="top">
											<!-- BEGIN MODULE: Feature 1 -->
											<table
												width="100%"
												border="0"
												cellspacing="0"
												cellpadding="0"
												role="presentation"
											>
												<tr>
													<td style="padding: 0px 0px 0px 0px">
														<table
															width="100%"
															border="0"
															cellspacing="0"
															cellpadding="0"
															role="presentation"
														>
															<tr>
																<td
																	valign="top"
																	class="pc-w520-padding-30-30-30-30 pc-w620-padding-35-35-35-35"
																	style="
																		padding: 40px 40px 40px 40px;
																		border-radius: 0px;
																		background-color: #ffffff;
																	"
																	bgcolor="#ffffff"
																>
																	<table
																		width="100%"
																		border="0"
																		cellpadding="0"
																		cellspacing="0"
																		role="presentation"
																	>
																		<tr>
																			<td
																				valign="top"
																				style="padding: 0px 0px 10px 0px"
																			>
																				<table
																					border="0"
																					cellpadding="0"
																					cellspacing="0"
																					role="presentation"
																				>
																					<tr>
																						<td
																							valign="top"
																							class="pc-font-alt"
																							style="
																								mso-line-height: exactly;
																								line-height: 142%;
																								letter-spacing: -0.4px;
																								font-family: 'Fira Sans',
																									Helvetica, Arial,
																									sans-serif;
																								font-size: 24px;
																								font-weight: bold;
																								color: #151515;
																							"
																						>
																							Features.
																						</td>
																					</tr>
																				</table>
																			</td>
																		</tr>
																	</table>
																	<table
																		width="100%"
																		border="0"
																		cellpadding="0"
																		cellspacing="0"
																		role="presentation"
																	>
																		<tr>
																			<td
																				valign="top"
																				style="padding: 0px 0px 42px 0px"
																			>
																				<table
																					border="0"
																					cellpadding="0"
																					cellspacing="0"
																					role="presentation"
																				>
																					<tr>
																						<td
																							valign="top"
																							class="pc-font-alt pc-w620-fontSize-16 pc-w620-lineHeight-26"
																							style="
																								mso-line-height: exactly;
																								line-height: 156%;
																								letter-spacing: -0.2px;
																								font-family: 'Fira Sans',
																									Helvetica, Arial,
																									sans-serif;
																								font-size: 18px;
																								font-weight: normal;
																								color: #9b9b9b;
																							"
																						>
																							<div>
																								<span
																									>Check out our many
																									features that we deskmate
																									offers you!</span
																								>
																							</div>
																						</td>
																					</tr>
																				</table>
																			</td>
																		</tr>
																	</table>
																	<table
																		width="100%"
																		border="0"
																		cellpadding="0"
																		cellspacing="0"
																		role="presentation"
																	>
																		<tr>
																			<td>
																				<table
																					class="pc-width-fill pc-w620-gridCollapsed-1"
																					width="100%"
																					border="0"
																					cellpadding="0"
																					cellspacing="0"
																					role="presentation"
																				>
																					<tr
																						class="pc-grid-tr-first pc-grid-tr-last"
																					>
																						<td
																							class="pc-grid-td-first pc-w620-padding-30-0"
																							align="left"
																							valign="top"
																							style="
																								width: 33.333333333333%;
																								padding-top: 0px;
																								padding-right: 20px;
																								padding-bottom: 0px;
																								padding-left: 0px;
																							"
																						>
																							<table
																								width="100%"
																								border="0"
																								cellpadding="0"
																								cellspacing="0"
																								role="presentation"
																								style="width: 100%"
																							>
																								<tr>
																									<td
																										align="left"
																										valign="top"
																									>
																										<table
																											align="left"
																											width="100%"
																											border="0"
																											cellpadding="0"
																											cellspacing="0"
																											role="presentation"
																											style="width: 100%"
																										>
																											<tr>
																												<td
																													align="left"
																													valign="top"
																												>
																													<table
																														width="100%"
																														border="0"
																														cellpadding="0"
																														cellspacing="0"
																														role="presentation"
																													>
																														<tr>
																															<td
																																valign="top"
																																style="
																																	padding: 0px
																																		0px
																																		10px
																																		0px;
																																"
																															>
																																<img
																																	src="https://cloudfilesdm.com/postcards/feature-1-image-2.jpg"
																																	class=""
																																	width="48"
																																	height="48"
																																	alt=""
																																	style="
																																		display: block;
																																		border: 0;
																																		outline: 0;
																																		line-height: 100%;
																																		-ms-interpolation-mode: bicubic;
																																		width: 48px;
																																		height: auto;
																																		max-width: 100%;
																																	"
																																/>
																															</td>
																														</tr>
																													</table>
																												</td>
																											</tr>
																											<tr>
																												<td
																													align="left"
																													valign="top"
																												>
																													<table
																														align="left"
																														border="0"
																														cellpadding="0"
																														cellspacing="0"
																														role="presentation"
																													>
																														<tr>
																															<td
																																valign="top"
																																style="
																																	padding: 0px
																																		0px
																																		6px
																																		0px;
																																"
																															>
																																<table
																																	border="0"
																																	cellpadding="0"
																																	cellspacing="0"
																																	role="presentation"
																																>
																																	<tr>
																																		<td
																																			valign="top"
																																			class="pc-font-alt"
																																			style="
																																				mso-line-height: exactly;
																																				line-height: 133%;
																																				letter-spacing: -0.2px;
																																				font-family: 'Fira Sans',
																																					Helvetica,
																																					Arial,
																																					sans-serif;
																																				font-size: 18px;
																																				font-weight: 500;
																																				color: #1b1b1b;
																																			"
																																		>
																																			<div>
																																				<span
																																					>24/7
																																					chat
																																					support</span
																																				>
																																			</div>
																																		</td>
																																	</tr>
																																</table>
																															</td>
																														</tr>
																													</table>
																												</td>
																											</tr>
																											<tr>
																												<td
																													align="left"
																													valign="top"
																												>
																													<table
																														border="0"
																														cellpadding="0"
																														cellspacing="0"
																														role="presentation"
																														align="left"
																													>
																														<tr>
																															<td
																																valign="top"
																																class="pc-font-alt"
																																style="
																																	mso-line-height: exactly;
																																	line-height: 143%;
																																	letter-spacing: -0.2px;
																																	font-family: 'Fira Sans',
																																		Helvetica,
																																		Arial,
																																		sans-serif;
																																	font-size: 14px;
																																	font-weight: normal;
																																	color: #9b9b9b;
																																"
																															>
																																<div>
																																	<span
																																		>Chat
																																		with
																																		our
																																		agents
																																		about
																																		any
																																		problem
																																		you
																																		have
																																		at
																																		any
																																		time.</span
																																	>
																																</div>
																															</td>
																														</tr>
																													</table>
																												</td>
																											</tr>
																										</table>
																									</td>
																								</tr>
																							</table>
																						</td>
																						<td
																							class="pc-w620-padding-30-0"
																							align="left"
																							valign="top"
																							style="
																								width: 33.333333333333%;
																								padding-top: 0px;
																								padding-right: 20px;
																								padding-bottom: 0px;
																								padding-left: 20px;
																							"
																						>
																							<table
																								width="100%"
																								border="0"
																								cellpadding="0"
																								cellspacing="0"
																								role="presentation"
																								style="width: 100%"
																							>
																								<tr>
																									<td
																										align="left"
																										valign="top"
																									>
																										<table
																											align="left"
																											width="100%"
																											border="0"
																											cellpadding="0"
																											cellspacing="0"
																											role="presentation"
																											style="width: 100%"
																										>
																											<tr>
																												<td
																													align="left"
																													valign="top"
																												>
																													<table
																														width="100%"
																														border="0"
																														cellpadding="0"
																														cellspacing="0"
																														role="presentation"
																													>
																														<tr>
																															<td
																																valign="top"
																																style="
																																	padding: 0px
																																		0px
																																		10px
																																		0px;
																																"
																															>
																																<img
																																	src="https://cloudfilesdm.com/postcards/feature-1-image-1.jpg"
																																	class=""
																																	width="48"
																																	height="48"
																																	alt=""
																																	style="
																																		display: block;
																																		border: 0;
																																		outline: 0;
																																		line-height: 100%;
																																		-ms-interpolation-mode: bicubic;
																																		width: 48px;
																																		height: auto;
																																		max-width: 100%;
																																	"
																																/>
																															</td>
																														</tr>
																													</table>
																												</td>
																											</tr>
																											<tr>
																												<td
																													align="left"
																													valign="top"
																												>
																													<table
																														align="left"
																														border="0"
																														cellpadding="0"
																														cellspacing="0"
																														role="presentation"
																													>
																														<tr>
																															<td
																																valign="top"
																																style="
																																	padding: 0px
																																		0px
																																		6px
																																		0px;
																																"
																															>
																																<table
																																	border="0"
																																	cellpadding="0"
																																	cellspacing="0"
																																	role="presentation"
																																>
																																	<tr>
																																		<td
																																			valign="top"
																																			class="pc-font-alt"
																																			style="
																																				mso-line-height: exactly;
																																				line-height: 133%;
																																				letter-spacing: -0.2px;
																																				font-family: 'Fira Sans',
																																					Helvetica,
																																					Arial,
																																					sans-serif;
																																				font-size: 18px;
																																				font-weight: 500;
																																				color: #1b1b1b;
																																			"
																																		>
																																			<div>
																																				<span
																																					>Tickets</span
																																				>
																																			</div>
																																		</td>
																																	</tr>
																																</table>
																															</td>
																														</tr>
																													</table>
																												</td>
																											</tr>
																											<tr>
																												<td
																													align="left"
																													valign="top"
																												>
																													<table
																														border="0"
																														cellpadding="0"
																														cellspacing="0"
																														role="presentation"
																														align="left"
																													>
																														<tr>
																															<td
																																valign="top"
																																class="pc-font-alt"
																																style="
																																	mso-line-height: exactly;
																																	line-height: 143%;
																																	letter-spacing: -0.2px;
																																	font-family: 'Fira Sans',
																																		Helvetica,
																																		Arial,
																																		sans-serif;
																																	font-size: 14px;
																																	font-weight: normal;
																																	color: #9b9b9b;
																																"
																															>
																																<div>
																																	<span
																																		>Open
																																		up
																																		a
																																		ticket
																																		descibing
																																		your
																																		problem.
																																		Wait
																																		for
																																		an
																																		agent
																																		to
																																		solve
																																		your
																																		problem.</span
																																	>
																																</div>
																															</td>
																														</tr>
																													</table>
																												</td>
																											</tr>
																										</table>
																									</td>
																								</tr>
																							</table>
																						</td>
																						<td
																							class="pc-grid-td-last pc-w620-padding-30-0"
																							align="left"
																							valign="top"
																							style="
																								width: 33.333333333333%;
																								padding-top: 0px;
																								padding-right: 0px;
																								padding-bottom: 0px;
																								padding-left: 20px;
																							"
																						>
																							<table
																								width="100%"
																								border="0"
																								cellpadding="0"
																								cellspacing="0"
																								role="presentation"
																								style="width: 100%"
																							>
																								<tr>
																									<td
																										align="left"
																										valign="top"
																									>
																										<table
																											align="left"
																											width="100%"
																											border="0"
																											cellpadding="0"
																											cellspacing="0"
																											role="presentation"
																											style="width: 100%"
																										>
																											<tr>
																												<td
																													align="left"
																													valign="top"
																												>
																													<table
																														width="100%"
																														border="0"
																														cellpadding="0"
																														cellspacing="0"
																														role="presentation"
																													>
																														<tr>
																															<td
																																valign="top"
																																style="
																																	padding: 0px
																																		0px
																																		10px
																																		0px;
																																"
																															>
																																<img
																																	src="https://cloudfilesdm.com/postcards/feature-1-image-3.jpg"
																																	class=""
																																	width="48"
																																	height="48"
																																	alt=""
																																	style="
																																		display: block;
																																		border: 0;
																																		outline: 0;
																																		line-height: 100%;
																																		-ms-interpolation-mode: bicubic;
																																		width: 48px;
																																		height: auto;
																																		max-width: 100%;
																																	"
																																/>
																															</td>
																														</tr>
																													</table>
																												</td>
																											</tr>
																											<tr>
																												<td
																													align="left"
																													valign="top"
																												>
																													<table
																														align="left"
																														border="0"
																														cellpadding="0"
																														cellspacing="0"
																														role="presentation"
																													>
																														<tr>
																															<td
																																valign="top"
																																style="
																																	padding: 0px
																																		0px
																																		6px
																																		0px;
																																"
																															>
																																<table
																																	border="0"
																																	cellpadding="0"
																																	cellspacing="0"
																																	role="presentation"
																																>
																																	<tr>
																																		<td
																																			valign="top"
																																			class="pc-font-alt"
																																			style="
																																				mso-line-height: exactly;
																																				line-height: 133%;
																																				letter-spacing: -0.2px;
																																				font-family: 'Fira Sans',
																																					Helvetica,
																																					Arial,
																																					sans-serif;
																																				font-size: 18px;
																																				font-weight: 500;
																																				color: #1b1b1b;
																																			"
																																		>
																																			<div>
																																				<span
																																					>Knowledge
																																					Base</span
																																				>
																																			</div>
																																		</td>
																																	</tr>
																																</table>
																															</td>
																														</tr>
																													</table>
																												</td>
																											</tr>
																											<tr>
																												<td
																													align="left"
																													valign="top"
																												>
																													<table
																														border="0"
																														cellpadding="0"
																														cellspacing="0"
																														role="presentation"
																														align="left"
																													>
																														<tr>
																															<td
																																valign="top"
																																class="pc-font-alt"
																																style="
																																	mso-line-height: exactly;
																																	line-height: 143%;
																																	letter-spacing: -0.2px;
																																	font-family: 'Fira Sans',
																																		Helvetica,
																																		Arial,
																																		sans-serif;
																																	font-size: 14px;
																																	font-weight: normal;
																																	color: #9b9b9b;
																																"
																															>
																																<div>
																																	<span
																																		>Check
																																		our
																																		popular
																																		and
																																		uptodate
																																		knowledge
																																		base
																																		for
																																		frequently
																																		asked
																																		questions
																																		and
																																		problems.</span
																																	>
																																</div>
																															</td>
																														</tr>
																													</table>
																												</td>
																											</tr>
																										</table>
																									</td>
																								</tr>
																							</table>
																						</td>
																					</tr>
																				</table>
																			</td>
																		</tr>
																	</table>
																</td>
															</tr>
														</table>
													</td>
												</tr>
											</table>
											<!-- END MODULE: Feature 1 -->
										</td>
									</tr>
									<tr>
										<td valign="top">
											<!-- BEGIN MODULE: Footer 1 -->
											<table
												width="100%"
												border="0"
												cellspacing="0"
												cellpadding="0"
												role="presentation"
											>
												<tr>
													<td style="padding: 0px 0px 0px 0px">
														<table
															width="100%"
															border="0"
															cellspacing="0"
															cellpadding="0"
															role="presentation"
														>
															<tr>
																<td
																	valign="top"
																	class="pc-w520-padding-30-30-30-30 pc-w620-padding-35-35-35-35"
																	style="
																		padding: 40px 40px 40px 40px;
																		border-radius: 0px;
																		background-color: #1b1b1b;
																	"
																	bgcolor="#1b1b1b"
																>
																	<table
																		width="100%"
																		border="0"
																		cellpadding="0"
																		cellspacing="0"
																		role="presentation"
																	>
																		<tr>
																			<td>
																				<table
																					class="pc-width-fill pc-w620-gridCollapsed-1"
																					width="100%"
																					border="0"
																					cellpadding="0"
																					cellspacing="0"
																					role="presentation"
																				>
																					<tr
																						class="pc-grid-tr-first pc-grid-tr-last"
																					>
																						<td
																							class="pc-grid-td-first pc-w620-padding-40-0"
																							align="left"
																							valign="top"
																							style="
																								width: 50%;
																								padding-top: 0px;
																								padding-right: 20px;
																								padding-bottom: 0px;
																								padding-left: 0px;
																							"
																						>
																							<table
																								width="100%"
																								border="0"
																								cellpadding="0"
																								cellspacing="0"
																								role="presentation"
																								style="width: 100%"
																							>
																								<tr>
																									<td
																										align="left"
																										valign="top"
																									>
																										<table
																											align="left"
																											width="100%"
																											border="0"
																											cellpadding="0"
																											cellspacing="0"
																											role="presentation"
																											style="width: 100%"
																										>
																											<tr>
																												<td
																													align="left"
																													valign="top"
																												>
																													<table
																														align="left"
																														border="0"
																														cellpadding="0"
																														cellspacing="0"
																														role="presentation"
																													>
																														<tr>
																															<td
																																valign="top"
																																style="
																																	padding: 0px
																																		0px
																																		10px
																																		0px;
																																"
																															>
																																<table
																																	border="0"
																																	cellpadding="0"
																																	cellspacing="0"
																																	role="presentation"
																																>
																																	<tr>
																																		<td
																																			valign="top"
																																			class="pc-font-alt"
																																			style="
																																				mso-line-height: exactly;
																																				line-height: 133%;
																																				font-family: 'Fira Sans',
																																					Helvetica,
																																					Arial,
																																					sans-serif;
																																				font-size: 18px;
																																				font-weight: 500;
																																				color: #ffffff;
																																			"
																																		>
																																			Follow
																																			Us.
																																		</td>
																																	</tr>
																																</table>
																															</td>
																														</tr>
																													</table>
																												</td>
																											</tr>
																											<tr>
																												<td
																													align="left"
																													valign="top"
																												>
																													<table
																														align="left"
																														border="0"
																														cellpadding="0"
																														cellspacing="0"
																														role="presentation"
																													>
																														<tr>
																															<td
																																class="pc-w620-spacing-0-0-22-0"
																																valign="top"
																																style="
																																	padding: 0px
																																		0px
																																		52px
																																		0px;
																																"
																															>
																																<table
																																	border="0"
																																	cellpadding="0"
																																	cellspacing="0"
																																	role="presentation"
																																>
																																	<tr>
																																		<td
																																			valign="top"
																																			class="pc-font-alt"
																																			style="
																																				mso-line-height: exactly;
																																				line-height: 143%;
																																				letter-spacing: -0.2px;
																																				font-family: 'Fira Sans',
																																					Helvetica,
																																					Arial,
																																					sans-serif;
																																				font-size: 14px;
																																				font-weight: normal;
																																				color: #d8d8d8;
																																			"
																																		>
																																			<div>
																																				<span
																																					>Please
																																					do
																																					not
																																					hesitate
																																					to
																																					send
																																					us
																																					an
																																					email
																																					if
																																					you
																																					have
																																					any
																																					inquires!</span
																																				>
																																			</div>
																																			<div>
																																				<span
																																					>&#xFEFF;</span
																																				>
																																			</div>
																																			<div>
																																				<span
																																					>Follow
																																					us
																																					on
																																					social
																																					media
																																					for
																																					weekly
																																					updates!</span
																																				>
																																			</div>
																																		</td>
																																	</tr>
																																</table>
																															</td>
																														</tr>
																													</table>
																												</td>
																											</tr>
																											<tr>
																												<td
																													align="left"
																													valign="top"
																												>
																													<table
																														align="left"
																														border="0"
																														cellpadding="0"
																														cellspacing="0"
																														role="presentation"
																													>
																														<tr>
																															<td
																																align="left"
																															>
																																<table
																																	class="pc-width-hug pc-w620-gridCollapsed-0"
																																	align="left"
																																	border="0"
																																	cellpadding="0"
																																	cellspacing="0"
																																	role="presentation"
																																>
																																	<tr
																																		class="pc-grid-tr-first pc-grid-tr-last"
																																	>
																																		<td
																																			class="pc-grid-td-first pc-w620-padding-0-10"
																																			valign="middle"
																																			style="
																																				padding-top: 0px;
																																				padding-right: 10px;
																																				padding-bottom: 0px;
																																				padding-left: 0px;
																																			"
																																		>
																																			<table
																																				border="0"
																																				cellpadding="0"
																																				cellspacing="0"
																																				role="presentation"
																																			>
																																				<tr>
																																					<td
																																						align="left"
																																						valign="top"
																																					>
																																						<table
																																							align="left"
																																							border="0"
																																							cellpadding="0"
																																							cellspacing="0"
																																							role="presentation"
																																						>
																																							<tr>
																																								<td
																																									align="left"
																																									valign="top"
																																								>
																																									<table
																																										align="left"
																																										border="0"
																																										cellpadding="0"
																																										cellspacing="0"
																																										role="presentation"
																																									>
																																										<tr>
																																											<td
																																												valign="top"
																																											>
																																												<table
																																													border="0"
																																													cellpadding="0"
																																													cellspacing="0"
																																													role="presentation"
																																													align="left"
																																												>
																																													<tr>
																																														<td
																																															valign="top"
																																															align="left"
																																														>
																																															<div
																																																class="pc-font-alt"
																																																style="
																																																	text-align: left;
																																																	text-align-last: left;
																																																"
																																															>
																																																<img
																																																	src="https://cloudfilesdm.com/postcards/b27f430c0285b548375dbba5702221b7.png"
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
																																														</td>
																																													</tr>
																																												</table>
																																											</td>
																																										</tr>
																																									</table>
																																								</td>
																																							</tr>
																																						</table>
																																					</td>
																																				</tr>
																																			</table>
																																		</td>
																																		<td
																																			class="pc-w620-padding-0-10"
																																			valign="middle"
																																			style="
																																				padding-top: 0px;
																																				padding-right: 10px;
																																				padding-bottom: 0px;
																																				padding-left: 10px;
																																			"
																																		>
																																			<table
																																				border="0"
																																				cellpadding="0"
																																				cellspacing="0"
																																				role="presentation"
																																			>
																																				<tr>
																																					<td
																																						align="left"
																																						valign="top"
																																					>
																																						<table
																																							align="left"
																																							border="0"
																																							cellpadding="0"
																																							cellspacing="0"
																																							role="presentation"
																																						>
																																							<tr>
																																								<td
																																									align="left"
																																									valign="top"
																																								>
																																									<table
																																										align="left"
																																										border="0"
																																										cellpadding="0"
																																										cellspacing="0"
																																										role="presentation"
																																									>
																																										<tr>
																																											<td
																																												valign="top"
																																											>
																																												<table
																																													border="0"
																																													cellpadding="0"
																																													cellspacing="0"
																																													role="presentation"
																																													align="left"
																																												>
																																													<tr>
																																														<td
																																															valign="top"
																																															align="left"
																																														>
																																															<div
																																																class="pc-font-alt"
																																																style="
																																																	text-align: left;
																																																	text-align-last: left;
																																																"
																																															>
																																																<img
																																																	src="https://cloudfilesdm.com/postcards/10451afef0b15b3557459ca08369e514.png"
																																																	class=""
																																																	width="22"
																																																	height="20"
																																																	style="
																																																		display: block;
																																																		border: 0;
																																																		outline: 0;
																																																		line-height: 100%;
																																																		-ms-interpolation-mode: bicubic;
																																																		width: 22px;
																																																		height: auto;
																																																		max-width: 100%;
																																																	"
																																																	alt=""
																																																/>
																																															</div>
																																														</td>
																																													</tr>
																																												</table>
																																											</td>
																																										</tr>
																																									</table>
																																								</td>
																																							</tr>
																																						</table>
																																					</td>
																																				</tr>
																																			</table>
																																		</td>
																																		<td
																																			class="pc-w620-padding-0-10"
																																			valign="middle"
																																			style="
																																				padding-top: 0px;
																																				padding-right: 10px;
																																				padding-bottom: 0px;
																																				padding-left: 10px;
																																			"
																																		>
																																			<table
																																				border="0"
																																				cellpadding="0"
																																				cellspacing="0"
																																				role="presentation"
																																			>
																																				<tr>
																																					<td
																																						align="left"
																																						valign="top"
																																					>
																																						<table
																																							align="left"
																																							border="0"
																																							cellpadding="0"
																																							cellspacing="0"
																																							role="presentation"
																																						>
																																							<tr>
																																								<td
																																									align="left"
																																									valign="top"
																																								>
																																									<table
																																										align="left"
																																										border="0"
																																										cellpadding="0"
																																										cellspacing="0"
																																										role="presentation"
																																									>
																																										<tr>
																																											<td
																																												valign="top"
																																											>
																																												<table
																																													border="0"
																																													cellpadding="0"
																																													cellspacing="0"
																																													role="presentation"
																																													align="left"
																																												>
																																													<tr>
																																														<td
																																															valign="top"
																																															align="left"
																																														>
																																															<div
																																																class="pc-font-alt"
																																																style="
																																																	text-align: left;
																																																	text-align-last: left;
																																																"
																																															>
																																																<img
																																																	src="https://cloudfilesdm.com/postcards/d89d65d93ee39fec8f716aefc9b687fa.png"
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
																																														</td>
																																													</tr>
																																												</table>
																																											</td>
																																										</tr>
																																									</table>
																																								</td>
																																							</tr>
																																						</table>
																																					</td>
																																				</tr>
																																			</table>
																																		</td>
																																		<td
																																			class="pc-grid-td-last pc-w620-padding-0-10"
																																			valign="middle"
																																			style="
																																				padding-top: 0px;
																																				padding-right: 0px;
																																				padding-bottom: 0px;
																																				padding-left: 10px;
																																			"
																																		>
																																			<table
																																				border="0"
																																				cellpadding="0"
																																				cellspacing="0"
																																				role="presentation"
																																			>
																																				<tr>
																																					<td
																																						align="left"
																																						valign="top"
																																					>
																																						<table
																																							align="left"
																																							border="0"
																																							cellpadding="0"
																																							cellspacing="0"
																																							role="presentation"
																																						>
																																							<tr>
																																								<td
																																									align="left"
																																									valign="top"
																																								>
																																									<table
																																										align="left"
																																										border="0"
																																										cellpadding="0"
																																										cellspacing="0"
																																										role="presentation"
																																									>
																																										<tr>
																																											<td
																																												valign="top"
																																											>
																																												<table
																																													border="0"
																																													cellpadding="0"
																																													cellspacing="0"
																																													role="presentation"
																																													align="left"
																																												>
																																													<tr>
																																														<td
																																															valign="top"
																																															align="left"
																																														>
																																															<div
																																																class="pc-font-alt"
																																																style="
																																																	text-align: left;
																																																	text-align-last: left;
																																																"
																																															>
																																																<img
																																																	src="https://cloudfilesdm.com/postcards/5a14400163a58e597a200db837a9ee39.png"
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
																																														</td>
																																													</tr>
																																												</table>
																																											</td>
																																										</tr>
																																									</table>
																																								</td>
																																							</tr>
																																						</table>
																																					</td>
																																				</tr>
																																			</table>
																																		</td>
																																	</tr>
																																</table>
																															</td>
																														</tr>
																													</table>
																												</td>
																											</tr>
																										</table>
																									</td>
																								</tr>
																							</table>
																						</td>
																						<td
																							class="pc-grid-td-last pc-w620-padding-40-0"
																							align="left"
																							valign="top"
																							style="
																								width: 50%;
																								padding-top: 0px;
																								padding-right: 0px;
																								padding-bottom: 0px;
																								padding-left: 20px;
																							"
																						>
																							<table
																								width="100%"
																								border="0"
																								cellpadding="0"
																								cellspacing="0"
																								role="presentation"
																								style="width: 100%"
																							>
																								<tr>
																									<td
																										align="left"
																										valign="top"
																									>
																										<table
																											align="left"
																											width="100%"
																											border="0"
																											cellpadding="0"
																											cellspacing="0"
																											role="presentation"
																											style="width: 100%"
																										>
																											<tr>
																												<td
																													align="left"
																													valign="top"
																												>
																													<table
																														align="left"
																														border="0"
																														cellpadding="0"
																														cellspacing="0"
																														role="presentation"
																													>
																														<tr>
																															<td
																																valign="top"
																																style="
																																	padding: 0px
																																		0px
																																		10px
																																		0px;
																																"
																															>
																																<table
																																	border="0"
																																	cellpadding="0"
																																	cellspacing="0"
																																	role="presentation"
																																>
																																	<tr>
																																		<td
																																			valign="top"
																																			class="pc-font-alt"
																																			style="
																																				mso-line-height: exactly;
																																				line-height: 133%;
																																				letter-spacing: -0.2px;
																																				font-family: 'Fira Sans',
																																					Helvetica,
																																					Arial,
																																					sans-serif;
																																				font-size: 18px;
																																				font-weight: 500;
																																				color: #ffffff;
																																			"
																																		>
																																			Contact
																																			us
																																		</td>
																																	</tr>
																																</table>
																															</td>
																														</tr>
																													</table>
																												</td>
																											</tr>
																											<tr>
																												<td
																													align="left"
																													valign="top"
																												>
																													<table
																														align="left"
																														border="0"
																														cellpadding="0"
																														cellspacing="0"
																														role="presentation"
																													>
																														<tr>
																															<td
																																class="pc-w620-spacing-0-0-25-0"
																																valign="top"
																																style="
																																	padding: 0px
																																		0px
																																		45px
																																		0px;
																																"
																															>
																																<table
																																	border="0"
																																	cellpadding="0"
																																	cellspacing="0"
																																	role="presentation"
																																>
																																	<tr>
																																		<td
																																			valign="top"
																																			class="pc-font-alt"
																																			style="
																																				mso-line-height: exactly;
																																				line-height: 143%;
																																				letter-spacing: -0.2px;
																																				font-family: 'Fira Sans',
																																					Helvetica,
																																					Arial,
																																					sans-serif;
																																				font-size: 14px;
																																				font-weight: normal;
																																				color: #d8d8d8;
																																			"
																																		>
																																			King
																																			street,
																																			2901
																																			Marmara
																																			road,
																																			New&zwnj;york,
																																			WA
																																			98122&zwnj;-1090
																																		</td>
																																	</tr>
																																</table>
																															</td>
																														</tr>
																													</table>
																												</td>
																											</tr>
																											<tr>
																												<td
																													align="left"
																													valign="top"
																												>
																													<table
																														align="left"
																														border="0"
																														cellpadding="0"
																														cellspacing="0"
																														role="presentation"
																													>
																														<tr>
																															<td
																																valign="top"
																																style="
																																	padding: 0px
																																		0px
																																		8px
																																		0px;
																																"
																															>
																																<table
																																	border="0"
																																	cellpadding="0"
																																	cellspacing="0"
																																	role="presentation"
																																	align="left"
																																>
																																	<tr>
																																		<td
																																			valign="top"
																																			align="left"
																																		>
																																			<div
																																				class="pc-font-alt"
																																				style="
																																					line-height: 133%;
																																					letter-spacing: -0.2px;
																																					font-family: 'Fira Sans',
																																						Helvetica,
																																						Arial,
																																						sans-serif;
																																					font-size: 18px;
																																					font-weight: 500;
																																					color: #ffffff;
																																					text-align: left;
																																					text-align-last: left;
																																				"
																																			>
																																				749-977-3440
																																			</div>
																																		</td>
																																	</tr>
																																</table>
																															</td>
																														</tr>
																													</table>
																												</td>
																											</tr>
																											<tr>
																												<td
																													align="left"
																													valign="top"
																												>
																													<table
																														border="0"
																														cellpadding="0"
																														cellspacing="0"
																														role="presentation"
																														align="left"
																													>
																														<tr>
																															<td
																																valign="top"
																																align="left"
																															>
																																<div
																																	class="pc-font-alt"
																																	style="
																																		line-height: 171%;
																																		font-family: 'Fira Sans',
																																			Helvetica,
																																			Arial,
																																			sans-serif;
																																		font-size: 14px;
																																		font-weight: 500;
																																		color: #1595e7;
																																		text-align: left;
																																		text-align-last: left;
																																	"
																																>
																																	<div>
																																		<span
																																			>deskmateNoReply@gmail.com</span
																																		>
																																	</div>
																																</div>
																															</td>
																														</tr>
																													</table>
																												</td>
																											</tr>
																										</table>
																									</td>
																								</tr>
																							</table>
																						</td>
																					</tr>
																				</table>
																			</td>
																		</tr>
																	</table>
																</td>
															</tr>
														</table>
													</td>
												</tr>
											</table>
											<!-- END MODULE: Footer 1 -->
										</td>
									</tr>
									<tr>
										<td>
											<table
												width="100%"
												border="0"
												cellpadding="0"
												cellspacing="0"
												role="presentation"
											>
												<tr>
													<td
														align="center"
														valign="top"
														style="
															padding-top: 20px;
															padding-bottom: 20px;
															vertical-align: top;
														"
													>
														<a
															href="https://designmodo.com/postcards?uid=MjI1MzU0&type=footer"
															target="_blank"
															style="
																text-decoration: none;
																overflow: hidden;
																border-radius: 2px;
																display: inline-block;
															"
														>
															<img
																src="https://cloudfilesdm.com/postcards/promo-footer-dark.jpg"
																width="198"
																height="46"
																alt="Made with (o -) postcards"
																style="
																	width: 198px;
																	height: auto;
																	margin: 0 auto;
																	border: 0;
																	outline: 0;
																	line-height: 100%;
																	-ms-interpolation-mode: bicubic;
																	vertical-align: top;
																"
															/>
														</a>
														<img
															src="https://api-postcards.designmodo.com/tracking/mail/promo?uid=MjI1MzU0"
															width="1"
															height="1"
															alt=""
															style="display: none; width: 1px; height: 1px"
														/>
													</td>
												</tr>
											</table>
										</td>
									</tr>
								</table>
							</td>
						</tr>
					</table>
				</td>
			</tr>
		</table>
		<!-- Fix for Gmail on iOS -->
		<div class="pc-gmail-fix" style="white-space: nowrap; font: 15px courier; line-height: 0">
			&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
			&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
			&nbsp; &nbsp; &nbsp; &nbsp;
		</div>
	</body>
</html>

	`;
};
