const lineCountString = count => {
	let result = "1";
	for(let i = 2; i <= count; ++i) {
		result += "\n" + i;
	}

	return result;
}

const countLines = code => {
	let result = 1;
	for(let i = 0; i < code.length; ++i) {
		if(code[i] == '\n') {
			result += 1;
		}
	}

	return result;
}

const htmlSetLineNumbers = () => {
	const codeElement = document.getElementsByClassName("code-grid-content");

	for(let i = 0; i < codeElement.length; ++i) {
		let code = codeElement[i];
		const lineCount = countLines(code.innerHTML.trim());
		const lineText = lineCountString(lineCount);
		const siblings = code.parentElement.children;
		for(let j = 0; j < siblings.length; ++j) {
			if(siblings[j].classList.contains("code-grid-line")) {
				siblings[j].innerHTML = lineText;
				break;
			}
		}
	}
}

const highlightElement = (str, src, type) => {
	return str.replace(src, `<span class="${type}">${src}</span>`)
}

// Fix: Actually lex the thing
const htmlCodeHighlight = () => {
	const codeElement = document.getElementsByClassName("code-grid-content");

	const types = [
		"char",
		"short",
		"int",
		"uint",
		"long",
		"8_t",
		"16_t",
		"32_t",
		"64_t",
	];

	const keywords = [
		"return",
	];

	for(let i = 0; i < codeElement.length; ++i) {
		for(let j = 0; j < types.length; ++j) {
			codeElement[i].innerHTML = highlightElement(codeElement[i].innerHTML, types[j], "c_type");
		}

		for(let j = 0; j < keywords.length; ++j) {
			codeElement[i].innerHTML = highlightElement(codeElement[i].innerHTML, keywords[j], "c_keyword");
		}

	}
}


htmlSetLineNumbers();
htmlCodeHighlight();