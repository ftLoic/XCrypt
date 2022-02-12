const emotes = [
    "🍌", "🍆", "🍑", "🔞", "💦", "🥵", "👅", "🤤", "😜", "😏", "🤭", "👀", "🏩", "💋", "😘", "💕", "💘", "💞", "🔥", "♋", "🌭", "🥒", "🍩", "👄", "⛔", "👌"
];
const letters = [
    "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"
];

const textRot = (message, key) => {
    let result = "";
    for (let i = 0; i < message.length; i++) {
        let char = message.charAt(i);
        if (char.match(/[a-z]/i)) {
            key *= 2n;

            let code = char.charCodeAt(0);
            if (code >= 97 && code <= 122) {
                code = 97n + ((BigInt(code) - 97n + key) % 26n);
            }
            result += String.fromCharCode(Number(code));
        } else {
            result += char;
        }
    }
    return result;
};
const crypt = (message) => {
    let output = "";
    message = message.toLowerCase();
    // Remove accents
    var accentMap = {
        "à": "a",
        "á": "a",
        "â": "a",
        "é": "e",
        "è": "e",
        "ê": "e",
        "ï": "i",
        "î": "i",
        "ö": "o",
        "ô": "o",
        "ç": "c",
    };
    message = message.replace(/[àáâéèêïîöôç]/g, function (match) {
        return accentMap[match];
    });

    message = textRot(message, 6n);
    for (let i = 0; i < message.length; i++) {
        const letter = message[i];
        const index = letters.indexOf(letter);
        if (index !== -1) {
            output += emotes[index];
        } else {
            output += letter;
        }
    }
    return output;
}
const decrypt = (message) => {
    let output = "";
    message = [...message];
    for (let i = 0; i < message.length; i++) {
        const character = message[i];
        const index = emotes.indexOf(character);
        if (index !== -1) {
            output += letters[index];
        } else {
            output += character;
        }
    }
    return textRot(output.toLowerCase(), 20n);
}

document.getElementById("encrypt").addEventListener("click", () => {
    if (document.getElementById("xcrypt").value.length > 500) {
        alert("Please enter a shorter message (500 characters or less)");
        return;
    }
    document.getElementById("output").innerText = crypt(document.getElementById("xcrypt").value);
});
document.getElementById("decrypt").addEventListener("click", () => {
    document.getElementById("output").innerText = decrypt(document.getElementById("xcrypt").value);
});
document.getElementById("output").addEventListener("click", () => {
    if (navigator && navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(document.getElementById("output").innerText);
        // Copied!
        document.getElementById("output").classList.add("copied");
        setTimeout(() => {
            document.getElementById("output").classList.remove("copied");
        }, 1000);
    } else {
        document.getElementById("output").select();
        document.execCommand("copy");
    }
});