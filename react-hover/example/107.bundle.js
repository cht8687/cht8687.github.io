(window.webpackJsonp=window.webpackJsonp||[]).push([[107],{220:function(e,s,a){"use strict";function n(e){!function(e){var s=/\b(?:double|float|[su]?int(?:32|64)|s?fixed(?:32|64)|bool|string|bytes)\b/;e.languages.protobuf=e.languages.extend("clike",{"class-name":{pattern:/(\b(?:enum|extend|message|service)\s+)[A-Za-z_]\w*(?=\s*\{)/,lookbehind:!0},keyword:/\b(?:enum|extend|extensions|import|message|oneof|option|optional|package|public|repeated|required|reserved|service|syntax|to)\b/}),e.languages.insertBefore("protobuf","operator",{map:{pattern:/\bmap<\s*[\w.]+\s*,\s*[\w.]+\s*>(?=\s+[A-Za-z_]\w*\s*[=;])/,alias:"class-name",inside:{punctuation:/[<>.,]/,builtin:s}},builtin:s,"positional-class-name":{pattern:/(?:\b|\B\.)[A-Za-z_]\w*(?:\.[A-Za-z_]\w*)*(?=\s+[A-Za-z_]\w*\s*[=;])/,alias:"class-name",inside:{punctuation:/\./}},annotation:{pattern:/(\[\s*)[A-Za-z_]\w*(?=\s*=)/,lookbehind:!0}})}(e)}e.exports=n,n.displayName="protobuf",n.aliases=[]}}]);
//# sourceMappingURL=107.bundle.js.map