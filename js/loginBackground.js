// Supersize BG Jquery Plugin
$.fn.cxSuperSize = function (options) {
	var target = $(this);
	var nextImage = 1;
	// set defaults, fadeTime is set via CSS
	var defaults = {
		timeDelay: 6000,
		images: []
	};
	// extend seettings
	var settings = $.extend(defaults, options);
	// initiate the first delay if there is more than one imagse
	if (settings.images.length > 1) {
		var fadeDelay = window.setTimeout(fadeImage, settings.timeDelay);
	}
	// get the new images

	function getImage(url) {
		var deferred = $.Deferred();
		$.ajax({
			type: "GET",
			url: url
		}).done(function (result) {
			deferred.resolve(result);
		});
		return deferred.promise();
	}
	// fade the image via css

	function fadeImage() {
		if (target.css("display") !== "none") {
			getImage(settings.images[nextImage]).done(function (result) {
				target.append("<div>");
				target.children("div:last-child").css("background-image", "url(" + settings.images[nextImage] + ")");
				nextImage++;
				if (target.children().length >= 3) {
					target.children("div:first-child").remove();
				}
				window.clearTimeout(fadeDelay);
				if (nextImage >= settings.images.length) {
					nextImage = 0;
				}
				fadeDelay = window.setTimeout(fadeImage, settings.timeDelay);
			});
		}
	}
};

var cx;
(function (cx) {
	"use strict";
	(function (bgBranding) {
		bgBranding.docReady = function (fileNames) {
			var filePathStem = "../../images/login/";

			//07/24/14 - SJK: Switched to jQuery's map as IE7/8 do not support native map method and throw exceptions instead.
			var fullFilePaths = $.map(fileNames, function (name) {
				return filePathStem + name;
			});

			$("#bgBranding").cxSuperSize({ images: fullFilePaths });
		};
	})(cx.bgBranding || (cx.bgBranding = {}));
})(cx || (cx = {}));