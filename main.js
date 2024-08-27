class Sablon {
    static all = []
    category = ""
    sub_category = ""
    title = ""
    content = ""

    constructor(cat, subcat, title, content) {
        this.category = cat
        this.sub_category = subcat
        this.title = title
        this.content = content

        Sablon.all.push(this);
    }

    toString() {
        return `Sablon(\nCategory: ${this.category},\nSub-Category: ${this.sub_category},\nTitle: ${this.title},\nContent: ${this.content} $)`
    }

    static getAll() {
        return Sablon.all
    }
}

class JsonParser {
    constructor() { }

    Parse(listOfSablon) {
        const result = {};

        listOfSablon.forEach(sablon => {
            const category = sablon.category;

            // Initialize the category object if it doesn't exist
            if (!result[category]) {
                result[category] = {};
            }

            // If sub_category is present, nest the content under "Title"
            if (sablon.sub_category) {
                result[category][sablon.sub_category] = {
                    "Title": sablon.content
                };
            } else if (sablon.title) {
                // If sub_category is empty, use the title directly
                result[category][sablon.title] = sablon.content;
            }
        });

        return JSON.stringify(result, null, 4); // Pretty-print JSON with indentation
    }
}


// function test(fn, expectedResult) {
//     const result = fn(); // Call the function to get the result
//     const status = result === expectedResult ? "PASSED" : "FAILED"; // Check if the result matches the expected value
//     console.log(`[TEST] Function ${fn.name}. Expected result is ${expectedResult}. Got ${result}. Status: ${status}`);
// }


const s1 = new Sablon("Jeleng", "", "Normal", "Normal current complains")
const s2 = new Sablon("Jeleng", "", "Normal2", "Normal current complains")
list = [s1, s2]
parser = new JsonParser()
console.log(Sablon.getAll())
console.log(parser.Parse(list))
