# Elvis DAM stamp metadata plug-in

With this plug-in you can easily apply a predefined set of metadata values to a selection of assets. This is for example useful for asset managers that need to apply copyright information when importing assets.

![metadata stamper in action](https://github.com/WoodWing/elvis_metadata_stamper/blob/master/metadata-stamper.gif "metadata stamper in action")

## Prerequisites

The integration requires:

* Fully installed and licensed [WoodWing Assets server](https://www.woodwing.com/en/digital-asset-management-system) - v6.59 or higher.
  * If you want to use this plugin on Elvis DAM v6.1 - WoodWing Assets v6.58, use the [1.2 release](https://github.com/WoodWing/elvis_metadata_stamper/releases/tag/v1.2) of this plugin.
* WoodWing Assets administrator knowledge
* The user that uses the plugin should have view permissions on the baseName metadata field in order to display the stampfile name correctly in the panel

## Installation

V2.0
* Modified to work as an externally hosted plugin, does not work as locally installed plugin
* Read the [instruction](https://helpcenter.woodwing.com/hc/articles/360054980711) on installing Assets external plug-ins.

Below V2.0
* Read the [instruction](https://helpcenter.woodwing.com/hc/articles/115002644606) on installing Elvis plug-ins.
* Download or clone this package.
* If you downloaded the package: unpack the zip file and remove the GitHub branch postfix from the folder name (typically -master)
* Copy the folder to the Elvis Server plug-ins folder: `<Elvis Config>/plugins/active`.
* Activate the plug-in through the Elvis Management Console

## Creating stamp templates

Stamp templates are simply assets in Elvis that contain some metadata. Follow these steps to create one:

* Create an empty text file and save it with extension `.stamp`, for example `Standard copyright.stamp`.
* Import the file in Elvis
* Set the metadata fields you want to stamp, for example:
  * Copyright = `My company name`
  * Usage rights = `In house`
* The stamp template is now ready to be used

Note that any editable metadata field in Elvis of any type can be used as stamp field (except for filename). All stamp templates you have permission to as a user are shown in the stamp template panel. This makes it very easy to create stamp templates for other users, just upload and configure them in a folder accessible by the desired user (group).

## Using stamp templates

Stamping assets is easy:

* Select the assets that need to be stamped
* Open the stamp panel
* Choose your stamp template

## Changelog

See [releases](https://github.com/WoodWing/elvis_metadata_stamper/releases)
