
async function fetchData(category, ...keys) {
    try {
        // Fetch the JSON data
        const res = await fetch("/data.json");
        const jsonData = await res.json();

        // Navigate through the JSON data to get the desired value
        let data = jsonData[category];
        for (const key of keys) {
            data = data[key];
        }

        // Print the result to the console
        console.log(data);

        // Copy the result to the clipboard
        toClipBoard(data);
    } catch (error) {
        console.error('Error fetching or parsing data:', error);
    }
}

function toClipBoard(text) {
    navigator.clipboard.writeText(text)
        .then(() => {
            const alertDiv = document.createElement('div')
            alertDiv.innerHTML = `<div class="alert alert-success" style="position: absolute; right:10px; top: 10px;" role="alert">Text copied to clipboard successfully!</div>`
            document.body.appendChild(alertDiv)
            setTimeout(() => {
                alertDiv.remove();
            }, 2000);
            console.log('Text copied to clipboard successfully!');
        })
        .catch(err => {
            console.error('Failed to copy text to clipboard: ', err);
        });
}