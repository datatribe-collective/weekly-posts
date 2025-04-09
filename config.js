const fs = require('fs');

const logoBase64 = fs.readFileSync('./logo.svg', { encoding: 'base64' });
const logoDataUrl = `data:image/svg+xml;base64,${logoBase64}`;


module.exports = {
    stylesheet: ['./layout.css'],
    marked_options: {
        headerIds: true,
        smartypants: true,
    },
    pdf_options: {
        format: 'A4',
        margin: {
            top: '130px',
            bottom: '100px',
            left: '32px',
            right: '32px',
        },
        printBackground: true,
        displayHeaderFooter: true,
        headerTemplate: `
        <style>
        section {
            width: 100%;
            text-align: center;
            align-items: center;
            padding: 0 7px;
            background: #1b7182 !important;
            -webkit-print-color-adjust: exact;
            text-transform: uppercase;
            font-family: 'League Spartan', sans-serif;
            display: block;
            justify-content: center;
        }
        .logo img {
            max-width: 70px;
        }
        </style>
            
        <section>>
        <div style="height: 70px; margin-bottom: 3px;">
            <div class="logo">
                <img src="${logoDataUrl}" alt="Logo" style="width: 60px; height: 60px;" />
            </div>
            <div>
                <span style='color: white; font-weight: bold; font-size: 10pt'>Data</span>
                <span style='color: #fb5a01; font-weight: bold; font-size: 10pt'>Tribe</span>
            </div>
            </div>
        </section>
        `,
        footerTemplate: `
        <style>
        section {
            width: 100%;
            font-weight: normal;
            padding: 10px;
            background: #1b7182 !important;
            -webkit-print-color-adjust: exact;
            font-family: 'League Spartan', sans-serif;
            display: block;
        }
        </style>
        <section>
            <span style='font-size: 9pt; text-transform: none; height: 40px; text-align: center; align-items: center;'>
                PDF generated on: ${new Date().toLocaleDateString('fi-FI')}</span>
        </section>
        `,
    },
    stylesheet_encoding: 'utf-8',
};