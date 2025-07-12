export async function sendPrintJob({ userId, printer, base64 }: { userId: string, printer: string, base64: string }) {
    try {
        await fetch(`https://laundry-pro-printing.onrender.com/print/${userId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                printer,
                base64
            }),
        });
    }
    catch (error) {
        console.error('Error sending print job:', error);
        throw new Error('Failed to send print job');
    }
}