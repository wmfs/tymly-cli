# [2.7.0](https://github.com/wmfs/tymly-cli/compare/v2.6.1...v2.7.0) (2019-01-30)


### ✨ Features

* Add-Editable solicits edit field title ([195d0d2](https://github.com/wmfs/tymly-cli/commit/195d0d2))
* add-state-machine solicits form to use with the machine ([fe78d26](https://github.com/wmfs/tymly-cli/commit/fe78d26))
* add-state-machine solicits the model to scaffold against ([6f7d957](https://github.com/wmfs/tymly-cli/commit/6f7d957))
* add-state-machines list available state machines ([b7e4bff](https://github.com/wmfs/tymly-cli/commit/b7e4bff))


### 📦 Code Refactoring

* Move ask into actions directory ([7dfc4dc](https://github.com/wmfs/tymly-cli/commit/7dfc4dc))
* Move validators into action subdirectory ([0e082db](https://github.com/wmfs/tymly-cli/commit/0e082db))


### 🚨 Tests

* **deps:** Update add-editable tests for tymlyScaffold element ([224a1a4](https://github.com/wmfs/tymly-cli/commit/224a1a4))
* add-state-machine passed ([5c7a633](https://github.com/wmfs/tymly-cli/commit/5c7a633))
* add-state-machine test ([6af055f](https://github.com/wmfs/tymly-cli/commit/6af055f))
* Stop existing user profile from interfering with the tests ([c0b17d6](https://github.com/wmfs/tymly-cli/commit/c0b17d6))


### ♻️ Chores

* **deps:** Bump [@wmfs](https://github.com/wmfs)/tymly-scaffold to get makeStateMachine ([793d9b7](https://github.com/wmfs/tymly-cli/commit/793d9b7))

## [2.6.1](https://github.com/wmfs/tymly-cli/compare/v2.6.0...v2.6.1) (2019-01-28)


### 🐛 Bug Fixes

* Add namespace field to generated blueprint.json ([ed66f4e](https://github.com/wmfs/tymly-cli/commit/ed66f4e))

# [2.6.0](https://github.com/wmfs/tymly-cli/compare/v2.5.0...v2.6.0) (2019-01-24)


### ✨ Features

* add-editable supports --model-path option, so you can scaffold a form for a model in another b ([a91bcc5](https://github.com/wmfs/tymly-cli/commit/a91bcc5))


### 📦 Code Refactoring

* Return model name and fields, rather than just name ([a2c94e5](https://github.com/wmfs/tymly-cli/commit/a2c94e5))

# [2.5.0](https://github.com/wmfs/tymly-cli/compare/v2.4.0...v2.5.0) (2019-01-21)


### ✨ Features

* add-editable solicits filename before scaffolding form ([f0337e8](https://github.com/wmfs/tymly-cli/commit/f0337e8))

# [2.4.0](https://github.com/wmfs/tymly-cli/compare/v2.3.0...v2.4.0) (2019-01-18)


### ✨ Features

* Implemented property subset form generation ([b5720d8](https://github.com/wmfs/tymly-cli/commit/b5720d8))

# [2.3.0](https://github.com/wmfs/tymly-cli/compare/v2.2.0...v2.3.0) (2019-01-18)


### ✨ Features

* Add property title ([9108e07](https://github.com/wmfs/tymly-cli/commit/9108e07))
* add-editable for blueprints with one model ([cee1afd](https://github.com/wmfs/tymly-cli/commit/cee1afd))
* Hook add-editable into cli ([c2af9db](https://github.com/wmfs/tymly-cli/commit/c2af9db))
* No spaces allowed in property names ([9b84591](https://github.com/wmfs/tymly-cli/commit/9b84591))
* Select model property type from Scaffold.ModelTypes list ([739723c](https://github.com/wmfs/tymly-cli/commit/739723c))
* tymly add-model <model> ([ef9de61](https://github.com/wmfs/tymly-cli/commit/ef9de61))


### 🐛 Bug Fixes

* add-editable lets you select the model when there's more than one ([ee46850](https://github.com/wmfs/tymly-cli/commit/ee46850))
* stubbed out add editable action ([493dabd](https://github.com/wmfs/tymly-cli/commit/493dabd))
* **deps:** Update tymly-scaffold dependency ([b56968d](https://github.com/wmfs/tymly-cli/commit/b56968d))


### 📦 Code Refactoring

* Pull out Blueprint wrapper class ([64a8bb8](https://github.com/wmfs/tymly-cli/commit/64a8bb8))
* Pull out noSpaces validation ([3ad5563](https://github.com/wmfs/tymly-cli/commit/3ad5563))


### 🚨 Tests

* 100% coverage. w00t ([bd91d54](https://github.com/wmfs/tymly-cli/commit/bd91d54))
* add-model test with multiple fields ([e90ecaa](https://github.com/wmfs/tymly-cli/commit/e90ecaa))
* Factor out test running. Stub addModel ([30da480](https://github.com/wmfs/tymly-cli/commit/30da480))
* First add-editable test ([2211b63](https://github.com/wmfs/tymly-cli/commit/2211b63))
* First test for tymly add-model ([c7ecdf2](https://github.com/wmfs/tymly-cli/commit/c7ecdf2))
* outlined add-model ([d676d53](https://github.com/wmfs/tymly-cli/commit/d676d53))
* runTest changes wd to output directory before action, reverts afterwards ([872d4ee](https://github.com/wmfs/tymly-cli/commit/872d4ee))


### ⚙️ Continuous Integrations

* Bumped Node from 9 to 10 ([e1f1901](https://github.com/wmfs/tymly-cli/commit/e1f1901))


### 💎 Styles

* Lint fixes ([192f769](https://github.com/wmfs/tymly-cli/commit/192f769))

# [2.2.0](https://github.com/wmfs/tymly-cli/compare/v2.1.0...v2.2.0) (2019-01-15)


### ✨ Features

* Hook profile into new-blueprint ([ba732d3](https://github.com/wmfs/tymly-cli/commit/ba732d3))

# [2.1.0](https://github.com/wmfs/tymly-cli/compare/v2.0.0...v2.1.0) (2019-01-15)


### ✨ Features

* Factored out Profile ([957364e](https://github.com/wmfs/tymly-cli/commit/957364e))
* Sketch out what 'tymly init' should actually be. ([2ea6bcb](https://github.com/wmfs/tymly-cli/commit/2ea6bcb))


### 🐛 Bug Fixes

* **$jezbrain:** s/init/newBlueprint/g ([53d70e6](https://github.com/wmfs/tymly-cli/commit/53d70e6))


### 📚 Documentation

* Reset CHANGELOG ([703e911](https://github.com/wmfs/tymly-cli/commit/703e911))

# 2.0.0 (2019-01-14)


### ✨ Features

* Default github/npm org from initials of organisation ([f64de34](https://github.com/wmfs/tymly-cli/commit/f64de34))
* Default npm org to the github org ([e20b817](https://github.com/wmfs/tymly-cli/commit/e20b817))
* Do nothing program shell. ([17a6752](https://github.com/wmfs/tymly-cli/commit/17a6752))
* don't init if directory already exists ([1bd2797](https://github.com/wmfs/tymly-cli/commit/1bd2797))
* No blanks allowed in github or wmfs owner names ([60d856e](https://github.com/wmfs/tymly-cli/commit/60d856e))
* Scaffold up command line application ([0953292](https://github.com/wmfs/tymly-cli/commit/0953292))


### 🐛 Bug Fixes

* Swap out chalk for ansi-color ([e2812de](https://github.com/wmfs/tymly-cli/commit/e2812de))
* Use ansi-colors not ansi-color. Doh ([fdaafbc](https://github.com/wmfs/tymly-cli/commit/fdaafbc))


### 📚 Documentation

* Add Code of Conduct ([38c3bee](https://github.com/wmfs/tymly-cli/commit/38c3bee))
* Logo! ([24c96ab](https://github.com/wmfs/tymly-cli/commit/24c96ab))
* README polish ([3adc96f](https://github.com/wmfs/tymly-cli/commit/3adc96f))


### 🚨 Tests

* First passing test! ([2fd2268](https://github.com/wmfs/tymly-cli/commit/2fd2268))
* Use mock stdout in directory exists test ([2346426](https://github.com/wmfs/tymly-cli/commit/2346426))


### ♻️ Chores

* Startup housekeeping - LICENSE, .gitignore, skeleton package.json, that kind of thing ([0576268](https://github.com/wmfs/tymly-cli/commit/0576268))
