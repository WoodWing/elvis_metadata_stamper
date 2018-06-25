# Elvis DAM stamp metadata plug-in

With this plug-in you can easily apply a predefined set of metadata values to a selection of assets. This is for example useful for asset managers that need to apply copyright information when importing assets. 

![metadata stamper in action](https://github.com/WoodWing/elvis_metadata_stamper/blob/master/metadata-stamper.gif "metadata stamper in action")

## Prerequisites

The integration requires:

* Fully installed and licensed [Elvis DAM server](https://www.woodwing.com/en/digital-asset-management-system) - v6.1 or higher. 
* Elvis administrator knowledge

## Installation

* Read the [instruction](https://helpcenter.woodwing.com/hc/en-us/articles/202965685-Plug-ins-introduction-management) on installing Elvis plug-ins.
* Download or clone this pacakge.
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

v1.1
* Fix support for tags and datetime fields
* Fix IE UI glitches
* Handle long metadata values
* Fix Firefox UI glitches

v1.0
* Initial implementation
* Apply metadata to assets by clicking on a stamp template
