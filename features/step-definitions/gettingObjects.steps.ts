import { DataTable, Given, Then } from '@cucumber/cucumber';
import { Ensure, equals } from '@serenity-js/assertions';
import { isTrue } from '@serenity-js/assertions';
import { Actor, actorInTheSpotlight } from '@serenity-js/core';
import { By, ExecuteScript, LastScriptExecution, Navigate, PageElement } from '@serenity-js/web';

import { ExcludeHtmlText, FindHtmlText } from '../../test/bodyQuestions/ValuesInHtmlText';

// const bodyDiv = PageElement.located(By.css('body > div')).describedAs('hello world');
// const mealData = PageElement.located(By.css('#mealScript')).describedAs('meal data');
// const customerData = PageElement.located(By.css('#customerScript')).describedAs('customer data');

Given('{actor} opens {string}', (actor: Actor, string) =>
    actor.attemptsTo(
        Navigate.to(string),
    ));

Then('{pronoun} checks that the {word} doesnt contain', async (pronoun: Actor, section:string, tableOfNots: DataTable) => {
    const nottyHashes = tableOfNots.hashes();
    for (const nottyHash of nottyHashes) {
        await actorInTheSpotlight().attemptsTo(
            ExcludeHtmlText.using(section, nottyHash.forbidden))
    }
});

Then('{pronoun} checks that the {word} contains', async (pronoun: Actor, section: string, tableOfDoes: DataTable) => {
    const theDoes = tableOfDoes.hashes();
    for (const theDo of theDoes) {
        await actorInTheSpotlight().attemptsTo(
            FindHtmlText.using(section, theDo.permezzo))
    }
});

Then('{pronoun} should run a script to retrieve object {string} with {string}', (pronoun, objectKey: string, expectedValue: string) =>
    actorInTheSpotlight().attemptsTo(
        ExecuteScript.sync(`return { theValue: ${objectKey}}`),
        Ensure.that(LastScriptExecution.result<{ theValue: string }>().isPresent(), isTrue()),
        Ensure.that(LastScriptExecution.result<{ theValue: string }>().theValue, equals(expectedValue)),
    )
);

Then('{pronoun} should(s) run a script to retrieve object {string} with:', (pronoun: Actor, objectKey: string, expectedJson: string) =>
    actorInTheSpotlight().attemptsTo(
        ExecuteScript.sync(`return { theValue: ${objectKey}}`),
        Ensure.that(LastScriptExecution.result<{ theValue: object }>().isPresent(), isTrue()),
        Ensure.that(LastScriptExecution.result<{ theValue: object }>().theValue, equals(JSON.parse(expectedJson))),
    )
);