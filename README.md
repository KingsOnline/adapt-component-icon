# adapt-component-icon

Adds an text or html icon next to a component.

<img src='https://github.com/KingsOnline/repo-files/blob/master/component-icon-example.png?raw=true' />

## Usage

The `_iconName` attribute (html icon) will override `src` (image icon). If both attributes are blank the extension will not be applied.

### src

(String) A link to a image file.

### _iconName

(String) The name of the HTML icon you wish to use. The full list is available [here](https://github.com/adaptlearning/adapt-contrib-vanilla/blob/master/less/src/icons.less#L36-L362). The `.icon-` prefix and `:before` suffix are not required.

### position

(String) The position to display the icon. Only supports `left` or `right`.

## Limitations

Framework version 2.0.10 + required for Handlebars support.

---

Version number: 0.1.2
Framework versions: ^2.0.10
Maintainer: <a href='mailto:simon.date@kcl.ac.uk'>Simon Date</a>
