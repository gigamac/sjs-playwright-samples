Feature: querying a mock page

  In order to learn how to use Serenity/JS with Cucumber and Playwright
  As a Curious Developer
  I'd like to see an example

  Background:
    Given Arthur opens "/mockpage"

  Scenario Outline: A mock page doesnt contain text
    Then he checks that the body doesnt contain
      | forbidden    |
      | <forbiddens> |
      | carrots      |

    Examples:
      | forbiddens |
      | gnocci     |
      | broccoli   |
      | hello      |

  Scenario Outline: A meal tag contains text
    Then he checks that the meal contains
      | permezzo     |
      | <permitteds> |
      | butterbeans  |

    Examples:
      | permitteds |
      | gnocci     |
      | broccoli   |
      | hello      |

  Scenario Outline: A customer tag contains text
    Then he checks that the customer contains
      | permezzo     |
      | <permitteds> |
      | age: 35  |

    Examples:
      | permitteds |
      | dateOfVisit: "2022-04-08"     |
      | healthy   |
      | hello      |


  Scenario Outline: Opening a mock page to check a js
    Then he should run a script to retrieve object "<objectKey>" with "<value>"

    Examples:
      | objectKey               | value  |
      | foodieObject.menu.carbs | potato |
      | foodieObject.menu.carbs | gnocci |
      | foodieObject.menu.carbs | gnocci |

  Scenario Outline: Opening a mock page passing an object to check a js

    Then he should run a script to retrieve object "<objectKey>" with:
      """
      {
        "prots": "butterbeans",
        "carbs": "<carb>",
        "veg": "broccoli"
      }
      """

    Examples:
      | objectKey         | carb   |
      | foodieObject.menu | gnocci |
      | foodieObject.menu | potato |
