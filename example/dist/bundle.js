'use strict';

if(typeof window !== "undefined") { var global = window; }

var BLANKS = [undefined, null, false];
function flatCompact(items) {
	return items.reduce(function (memo, item) {
		return BLANKS.includes(item) ? memo : memo.concat(item.pop ? flatCompact(item) : item);
	}, []);
}

var VOID_ELEMENTS = {};
["area", "base", "br", "col", "embed", "hr", "img", "input", "keygen", "link", "meta", "param", "source", "track", "wbr"].forEach(function (tag) {
	VOID_ELEMENTS[tag] = true;
});
function generateHTML(tag, params) {
	for (var _len = arguments.length, children = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
		children[_key - 2] = arguments[_key];
	}
	return function (stream) {
		stream.write("<" + tag + generateAttributes(params) + ">");
		flatCompact(children).forEach(function (child) {
			if (child.call) {
				child(stream);
			} else if (child instanceof HTMLString) {
				stream.write(child.value);
			} else {
				var txt = htmlEncode(child.toString());
				stream.write(txt);
			}
		});
		if (!VOID_ELEMENTS[tag]) {
			stream.write("</" + tag + ">");
		}
		stream.flush();
	};
}
function HTMLString(str) {
	this.value = str;
}
function generateAttributes(params) {
	if (!params) {
		return "";
	}
	var attribs = Object.keys(params).reduce(function (memo, name) {
		var value = params[name];
		switch (value) {
			case null:
			case undefined:
				break;
			case true:
				memo.push(name);
				break;
			case false:
				break;
			default:
				if (typeof value === "number") {
					value = value.toString();
				} else if (!value.substr) {
					throw new Error("invalid attribute value: `" + JSON.stringify(value) + "`");
				}
				if (/ |"|'|>|'|\/|=/.test(name)) {
					throw new Error("invalid attribute name: `" + JSON.stringify(name) + "`");
				}
				memo.push(name + "=\"" + htmlEncode(value, true) + "\"");
		}
		return memo;
	}, []);
	return attribs.length === 0 ? "" : " " + attribs.join(" ");
}
function htmlEncode(str, attribute) {
	var res = str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
	if (attribute) {
		res = res.replace(/"/g, "&quot;").replace(/'/g, "&#x27;");
	}
	return res;
}

var toConsumableArray = function (arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  } else {
    return Array.from(arr);
  }
};

var TAG_MACROS = {};
function documentRenderer$1() {
	var doctype = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "<!DOCTYPE html>";
	return function (stream, element, params) {
		stream.writeln(doctype);
		createElement(element, params)(stream);
	};
}
function registerMacro(tag, fn) {
	if (TAG_MACROS[tag]) {
		throw new Error("invalid tag macro: <" + tag + "> already registered");
	}
	TAG_MACROS[tag] = fn;
}
function createElement(tag, params) {
	var macro = TAG_MACROS[tag];
	for (var _len = arguments.length, children = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
		children[_key - 2] = arguments[_key];
	}
	return macro ? macro.apply(undefined, [params].concat(toConsumableArray(flatCompact(children)))) : generateHTML.apply(undefined, [tag, params].concat(children));
}

registerMacro("site-index", function (_ref) {
	var title = _ref.title;
	return createElement(
		"default-layout",
		{ title: title },
		createElement(
			"h1",
			null,
			title
		)
	);
});
var render$1 = documentRenderer$1();

module.exports = render$1;
