# StudySmarter-Slides-Exporter

The StudySmarter Slides Exporter provides the possibility to export all created slides of a selected subject directly from StudySmarter.


## How to use StudySmarter Slides Exporter

Using the StudySmarter Slides Exporter is easy.

Login to StudySmarter and navigate to [https://app.studysmarter.de/subjects](https://app.studysmarter.de/subjects), then you need to import the `injection.js` file from your browser's JavaScript console as shown below. A window will appear showing the available subjects.

```javascript
$.getScript('https://piuswalter.github.io/StudySmarter-Slides-Exporter/injection.js');
```

Please note the information in the bottom bar at `Status`.

## Display the exported json file

Move all of your exported json files into the `input` folder and simply run the `generator.sh` bash script (`jq` is required as a dependency).

This will generate a `studysmarter.json` as well as an `img` folder inside of the `viewer` directory.

Now simply serve the viewer directory on a local webserver and get started!

## Error or bug found

Then open an issue or make a pull request. Thank you!

