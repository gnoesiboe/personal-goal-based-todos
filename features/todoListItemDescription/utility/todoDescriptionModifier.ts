import { splitAtLineBreak } from '../../../utility/stringUtilities';

export const changeSubItemCheckedStatus = (
    description: string,
    atIndex: number,
    checked: boolean,
) => {
    const lines = splitAtLineBreak(description);

    let currentSubItemIndex: number = 0;

    return lines
        .map((line) => {
            const match = line.match(/^[\s]*[*-]{1,1}[\s]+\[[ x]{1,1}\][\s]/);

            if (!match) {
                return line;
            }

            if (atIndex === currentSubItemIndex) {
                currentSubItemIndex++;

                if (checked) {
                    return line.replace(
                        /^([\s]*[*-]{1,1}[\s]+)\[[ x]{1,1}\][\s]+(.*)/,
                        '$1[x] $2',
                    );
                } else {
                    return line.replace(
                        /^([\s]*[*-]{1,1}[\s]+)\[[ x]{1,1}\][\s]+(.*)/,
                        '$1[ ] $2',
                    );
                }
            } else {
                currentSubItemIndex++;

                return line;
            }
        })
        .join('\n');
};
