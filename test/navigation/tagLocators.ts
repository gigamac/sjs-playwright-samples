import { By, PageElement } from "@serenity-js/web";

const bodyDiv: any = PageElement.located(By.css('body > div')).describedAs('hello world');
const mealData = PageElement.located(By.css('#mealScript')).describedAs('meal data');
const customerData = PageElement.located(By.css('#customerScript')).describedAs('customer data');

const tagLocators: string[][] = [['body', 'body > div'], ['meal', '#mealScript'], ['customer', '#customerScript']]
