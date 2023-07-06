import { google } from 'googleapis';

export async function getServerSideProps({ query }) {
    // Auth
    const auth = await google.auth.getClient({ scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'] });

    const sheets = google.sheets({ version: 'v4', auth });

    // Query
    const { id } = query;
    const range = `Sheet1!A${id}:B${id}`;

    const response = await sheets.spreadsheets.values.get({
        spreadsheetId: process.env.SHEET_ID,
        range,
    });

    // Result
    const [unit, rarity] = response.data.values[0];

    return {
        props: {
            unit,
            rarity
        }
    }
}

export default function Post({ unit, rarity }) {
    return <article>
        <h1>{unit}</h1>
        <div dangerouslySetInnerHTML={{ __html: rarity }}></div>
    </article>
}