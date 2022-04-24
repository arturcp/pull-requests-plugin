# To load the project locally

The first step is to clone the repository in a folder. Then, go to the browser, set the developer mode on and load `unpacked` the folder:

![](https://res.cloudinary.com/ongmungazi/image/upload/v1650718681/open-source/Screen_Shot_2022-04-23_at_9.45.14_AM.png)

Once you have the extension installed, by clicking on the icon you will be prompted to configure it:

![](https://res.cloudinary.com/ongmungazi/image/upload/v1650718878/open-source/Screen_Shot_2022-04-23_at_10.01.04_AM.png)

Follow the instructions and you are ready to use it.


# To generate the .crx file
http://www.adambarth.com/experimental/crx/docs/packaging.html

# Updating a package

To create an updated version of your extension:

* Increase the version number in manifest.json.
* Bring up the Extensions management page by going to this URL: chrome://extensions
* Click the Pack extension button. A dialog appears.
* In the Extension root directory field, specify the path to the extension's folder—for example, c:\myext.
* In the Private key file field, specify the location of the already generated .pem file for this extension—for example, c:\myext.pem.
* Click OK.
