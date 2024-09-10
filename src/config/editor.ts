import {
	AlignCenter,
	AlignJustify,
	AlignLeft,
	AlignRight,
	Bold,
	Highlighter,
	Italic,
	Strikethrough,
	Subscript,
	Superscript,
	Underline,
} from "lucide-react"

export const format_types = [
	{ label: "bold", icon: Bold },
	{ label: "italic", icon: Italic },
	{ label: "underline", icon: Underline },
	{ label: "strikethrough", icon: Strikethrough },
	{ label: "subscript", icon: Subscript },
	{ label: "superscript", icon: Superscript },
	{ label: "highlight", icon: Highlighter },
]

export const alignment_types = [
	{ label: "center", icon: AlignCenter },
	{ label: "justify", icon: AlignJustify },
	{ label: "left", icon: AlignLeft },
	{ label: "right", icon: AlignRight },
]
