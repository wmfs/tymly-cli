# [2.20.0](https://github.com/wmfs/tymly-cli/compare/v2.19.0...v2.20.0) (2019-02-14)


### ✨ Features

* **deps:** Pull in tymly-scaffold 1.21.0 so that models include typeHints ([07afad3](https://github.com/wmfs/tymly-cli/commit/07afad3))

# [2.19.0](https://github.com/wmfs/tymly-cli/compare/v2.18.0...v2.19.0) (2019-02-14)


### ✨ Features

* Filter available data type by blueprint domain. Present richer datatype list to users. ([ee964b2](https://github.com/wmfs/tymly-cli/commit/ee964b2))
* Swap all selects and multiselects to autocomplete ([136f36a](https://github.com/wmfs/tymly-cli/commit/136f36a))
* **add-model:** Ask data category ahead of asking data type ([a029098](https://github.com/wmfs/tymly-cli/commit/a029098))


### 🛠 Builds

* **deps:** Bump to tymly-scaffold 1.20.0 ([1d509df](https://github.com/wmfs/tymly-cli/commit/1d509df))


### 📦 Code Refactoring

* **add-model:** Rejig how properties are solicited ([f6b9b75](https://github.com/wmfs/tymly-cli/commit/f6b9b75))

# [2.18.0](https://github.com/wmfs/tymly-cli/compare/v2.17.0...v2.18.0) (2019-02-13)


### ✨ Features

* new-blueprint solicits data-domains ([03a000d](https://github.com/wmfs/tymly-cli/commit/03a000d))


### 🐛 Bug Fixes

* Cosmetic new-blueprint changes ([22c787c](https://github.com/wmfs/tymly-cli/commit/22c787c))


### 🛠 Builds

* **deps:** Bump tymly-scaffold to 1.18.0 ([d5bc394](https://github.com/wmfs/tymly-cli/commit/d5bc394))


### 💎 Styles

* lint fixes ([1c1a0f7](https://github.com/wmfs/tymly-cli/commit/1c1a0f7))

# [2.17.0](https://github.com/wmfs/tymly-cli/compare/v2.16.0...v2.17.0) (2019-02-13)


### ✨ Features

* Bring add-model UI into line with other add-* commands.  Request name rather than requiring on ([5b1d9f2](https://github.com/wmfs/tymly-cli/commit/5b1d9f2))


### 🐛 Bug Fixes

* Bump tymly-scaffold to 1.7.2. Correct tests to match ([de5f0c8](https://github.com/wmfs/tymly-cli/commit/de5f0c8))

# [2.16.0](https://github.com/wmfs/tymly-cli/compare/v2.15.0...v2.16.0) (2019-02-07)


### ✨ Features

* Solicit label and description for state machines ([accfd44](https://github.com/wmfs/tymly-cli/commit/accfd44))
* Solicit roles in addStateMachine ([ba16235](https://github.com/wmfs/tymly-cli/commit/ba16235))


### 🐛 Bug Fixes

* Fix chooseRole so it respects the suggestion ([4cab3bc](https://github.com/wmfs/tymly-cli/commit/4cab3bc))

# [2.15.0](https://github.com/wmfs/tymly-cli/compare/v2.14.0...v2.15.0) (2019-02-07)


### ✨ Features

* **deps:** Pull in tymly-scaffold 1.15.0 to get view state-machine ([e430467](https://github.com/wmfs/tymly-cli/commit/e430467))

# [2.14.0](https://github.com/wmfs/tymly-cli/compare/v2.13.1...v2.14.0) (2019-02-07)


### ✨ Features

* addViewable implementation ([1b381f1](https://github.com/wmfs/tymly-cli/commit/1b381f1))


### 📦 Code Refactoring

* Bring addViewable & addEditable together ([67926e0](https://github.com/wmfs/tymly-cli/commit/67926e0))


### 🚨 Tests

* addViewable tests ([42f1698](https://github.com/wmfs/tymly-cli/commit/42f1698))

## [2.13.1](https://github.com/wmfs/tymly-cli/compare/v2.13.0...v2.13.1) (2019-02-06)


### 🐛 Bug Fixes

* Fixes to add-search-doc generation ([4da83d8](https://github.com/wmfs/tymly-cli/commit/4da83d8))

# [2.13.0](https://github.com/wmfs/tymly-cli/compare/v2.12.1...v2.13.0) (2019-02-06)


### ✨ Features

* Add blueprint.stateMachines() method ([a0f59f9](https://github.com/wmfs/tymly-cli/commit/a0f59f9))
* addSearchDoc solicits launch information ([b7aa88d](https://github.com/wmfs/tymly-cli/commit/b7aa88d))


### 💎 Styles

* Remove unused require() ([c2930ec](https://github.com/wmfs/tymly-cli/commit/c2930ec))

## [2.12.1](https://github.com/wmfs/tymly-cli/compare/v2.12.0...v2.12.1) (2019-02-06)


### 🐛 Bug Fixes

* add-search-docs choose roles for doc ([324564d](https://github.com/wmfs/tymly-cli/commit/324564d))


### 🚨 Tests

* add-search-doc test for multiple description fields ([17f6e42](https://github.com/wmfs/tymly-cli/commit/17f6e42))
* Update tests for role restrictions ([4c1ac4d](https://github.com/wmfs/tymly-cli/commit/4c1ac4d))

# [2.12.0](https://github.com/wmfs/tymly-cli/compare/v2.11.0...v2.12.0) (2019-02-02)


### ✨ Features

* add-search-doc first pass ([2d1686b](https://github.com/wmfs/tymly-cli/commit/2d1686b))


### 📦 Code Refactoring

* Moving towards add-search-docs ([c32d850](https://github.com/wmfs/tymly-cli/commit/c32d850))


### 🚨 Tests

* Do nothing add-search-doc stub ([dec781f](https://github.com/wmfs/tymly-cli/commit/dec781f))
* First tests for add-search-doc ([5717bea](https://github.com/wmfs/tymly-cli/commit/5717bea))

# [2.11.0](https://github.com/wmfs/tymly-cli/compare/v2.10.0...v2.11.0) (2019-01-31)


### ✨ Features

* Complete add-role ([c3ed084](https://github.com/wmfs/tymly-cli/commit/c3ed084))
* Filling out add-role. ([34865c1](https://github.com/wmfs/tymly-cli/commit/34865c1))


### 🚨 Tests

* add-role tests ([6439829](https://github.com/wmfs/tymly-cli/commit/6439829))
* Extra add-category test ([c107a72](https://github.com/wmfs/tymly-cli/commit/c107a72))

# [2.10.0](https://github.com/wmfs/tymly-cli/compare/v2.9.0...v2.10.0) (2019-01-30)


### ✨ Features

* Extend add-state-machine to solicit categories ([cbe2390](https://github.com/wmfs/tymly-cli/commit/cbe2390))


### 🐛 Bug Fixes

* **deps:** Pull in tymly-scaffold 1.10.0 ([91cc12d](https://github.com/wmfs/tymly-cli/commit/91cc12d))


### 💎 Styles

* Lint fix ([9fe55bd](https://github.com/wmfs/tymly-cli/commit/9fe55bd))

# [2.9.0](https://github.com/wmfs/tymly-cli/compare/v2.8.0...v2.9.0) (2019-01-30)


### ✨ Features

* add-category command ([8b38e46](https://github.com/wmfs/tymly-cli/commit/8b38e46))

# [2.8.0](https://github.com/wmfs/tymly-cli/compare/v2.7.0...v2.8.0) (2019-01-30)


### ✨ Features

* add-model provide default property titles ([7259ef4](https://github.com/wmfs/tymly-cli/commit/7259ef4))
* add-state-machine solicits filename ([f6efaa2](https://github.com/wmfs/tymly-cli/commit/f6efaa2))
* Use meta.data field instead of tymly-scaffold ([0a6b8d3](https://github.com/wmfs/tymly-cli/commit/0a6b8d3))


### 🐛 Bug Fixes

* **deps:** Pull tymly-scaffold 1.8.1 ([846c9eb](https://github.com/wmfs/tymly-cli/commit/846c9eb))


### 🚨 Tests

* Additional state-machine tests ([f88914c](https://github.com/wmfs/tymly-cli/commit/f88914c))

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
