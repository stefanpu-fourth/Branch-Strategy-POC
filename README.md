# ESS

This is the main UI project for the ESS product

## Prerequisites

You will need the following things properly installed on your computer.

* [Git](http://git-scm.com/)
* [Node.js](http://nodejs.org/) (with NPM) and [Bower](http://bower.io/)

Run ```npm install -g bower``` to install bower

## Installation

* `npm install -g ember-cli`
* `git clone <repository-url>` this repository
* change into the new directory
* `npm install`
* `bower install`

## Contributing features or bug fixes

* All changes are made in a feature branch
* Branches are published as Github Pull Requests
* Pull Requests are merged when Jenkins passes them and the code has been reviewed.
* **Always** run ```ember test``` before committing, or at the very least pushing. Even
if you haven't added any tests ('fo shame). This checks that you haven't broken any tests
and also checks that the entire codebase is "jshint clean". If you have the ember server
running you can also visit http://localhost:4200 to run the tests
* When you think you're ready to merge then add a comment to that effect to the pull request.
"At mention" (e.g. @simonjefford) two team members to look over your pull request. Once both
team members have signed off (by way of commenting on the pull request) then it can be merged.
* Here's the process for merging:

    1. ```git fetch```
    2. ```git rebase origin/master``` (During the rebase there may
       well be conflicts you need to resolve)
    3. ```git push --force```
    4. Wait for Jenkins to OK the build.
    5. Merge.

### Working on a rebased branch

If a branch you have been working on has been rebased then:

0. Make sure your working copy is clean. Stash any changes if necessary
1. `git checkout <Your branch>`
2. `git fetch`
3. `git reset --hard origin/<Your branch>`
4. `git status`

`git status` should show your working copy as being clean.

## i18n (Internationalisation)

Rule 1 of ESS - there is no UI copy in string literals.

Rule 2 of ESS - THERE IS NO UI COPY IN STRING LITERALS.

In app/translations.js you will find code that resembles the following:

    export default {
        en: {
            product_details: {
                description: 'Description',
                price: 'Price'
            },
            notifications: {
                overbudget: {
                    near: 'You are within £{{amount}} of your budget.'
                    over: 'You are £{{amount}} over your budget.'
                }
            },
        fr: {
            cart: {
                checkout: 'caisse',
                qty: 'quantité'
            }
        }
    };

It is entirely possible that this data structure will end up coming from a server
somewhere. For now however, translation strings should go in here. Just worry about
the English strings for now.

Translations are "namespaced". We'll settle on the scheme later, but for now group
translations by the screen they're in.

To actually use the translations, use the ```t``` helper in a template.

    <p>{{ t 'product_details.description'}}: {{ product.description }}</p>
    <p>{{ t 'product_details.price'}}: {{ product.price }}</p>

Or, if the string is interpolated (has parameters)

    {{ t 'notifications.overbudget.near' amount=overage }}

Or within JavaScript

    import i18n from 'ess/i18n';
    var translated = i18n.t('product_details.description');

## Running / Development

* `ember server`
* Visit your app at http://localhost:4200.

### Code Generators

Make use of the many generators for code, try `ember help generate` for more details

### Using pods

The project structure makes use of the [pod structure](http://www.ember-cli.com/#pod-structure) which in future (Ember 2.0) will become the standard structure for ember applications.

Pods should be used for a given resource (controllers, routes, views and templates). Avoid using ember-data classes in pods for now.

Use `ember generate <blueprint> <options...> --pod`

### Running Tests

* `ember test`
* `ember test --server`

### Care and feeding of "low-level" event handlers

In a view or component you may well need to do something like this

    didInsertElement: function() {
        this.$(someSelector).on('resize.myComponent').function() {
            // handle the resize
        }
    }

Note the namespacing of the event - this associates the event with the
component or view.  This is important, because later on this needs to
happen:

    willDestroyElement: function() {
        this.$(someSelector).off('.myComponent')
    }

When the DOM element rendered by the component or view is about to be
removed, this code ensures that any event handlers that have been
attached _by this view or component_ will be removed.

## Testing Gotchas

### Dependency Management

Be aware when declaring controller dependencies via 'needs' in
moduleFor that transitive dependencies will need to be accounted
for. For Example:

* SearchBoxController depends on ApplicationController and SearchController
* ApplicationController depends on CategoryController
* SearchController depends on ApplicationController
* When writing tests for SearchBoxController dependencies will need to be written according to the dependency tree
* Looks like `[ 'controller:category', 'controller:application', 'controller:search' ]`

### Building

* `ember build` (development)
* `ember build --environment production` (production)

### Deploying

Deployment mechanism TBD

## Further Reading / Useful Links

* ember: http://emberjs.com/
* ember-cli: http://www.ember-cli.com/
* Development Browser Extensions
  * [ember inspector for chrome](https://chrome.google.com/webstore/detail/ember-inspector/bmdblncegkenkacieihfhpjfppoconhi)
  * [ember inspector for firefox](https://addons.mozilla.org/en-US/firefox/addon/ember-inspector/)
