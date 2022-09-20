import { Ensure, includes, not } from '@serenity-js/assertions';
import { Task } from '@serenity-js/core';
import { By, PageElement, Text } from '@serenity-js/web';

const tagLocators = {
    body: 'body > div',
    meal: '#mealScript',
    customer: '#customerScript'
}

export const FindHtmlText = {
    using: (locatorId: string, valueInText: string) =>
        Task.where(`#actor verifies the values are contained in the html`,
            Ensure.that(Text.of(htmlBlock.chosen(findLocator(locatorId))), includes(valueInText)),
        )
}

export const ExcludeHtmlText = {
    using: (locatorId: string, valueInText: string) =>
        Task.where(`#actor verifies the values are not contained in the html`,
            Ensure.that(Text.of(htmlBlock.chosen(findLocator(locatorId))), not(includes(valueInText))),
        )
}

const htmlBlock = {
    chosen: (tagTing: string) =>
        PageElement.located(By.css(tagTing)).describedAs(tagTing),
}

function findLocator(indexer: string): string {
    console.log(tagLocators);
    console.log(`<---- ${indexer}`, tagLocators[indexer])
    return tagLocators[indexer];
}