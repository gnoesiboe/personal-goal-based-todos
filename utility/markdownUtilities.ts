import marked, { Renderer } from 'marked';

marked.setOptions({
    breaks: true,
    gfm: true,
    smartLists: true,
});

// @ts-ignore somehow the types are incorrect
const renderer: Renderer = {
    listitem(text: string) {
        const augmentedText = text.replace(
            /^(<input[^>]*>)(.*)$/,
            '$1 <span>$2</span>',
        );

        return `<li>${augmentedText}</li>`;
    },
    checkbox: (checked: boolean): string => {
        const checkedValue = checked ? ' checked="checked"' : '';

        return `<input type="checkbox"${checkedValue} />`;
    },
};

marked.use({ renderer });

export const parseMarkdown = (
    value: string,
    inline: boolean = false,
): string => {
    return inline ? marked.parseInline(value) : marked.parse(value);
};
