// ==UserScript==
// @name        Put failing checks in Github PR on top
// @version     1.0.0
// @description A userscript that sorts PR checks
// @author      Ivan Dyachkov
// @namespace   https://github.com/id
// @include     https://github.com/*/*/pull/*
// @run-at      document-end
// ==/UserScript==
(() => {
	"use strict";

  function moveOnTop(className) {
    document.querySelectorAll(".merge-status-item").forEach((check) => {
      const icon = check.querySelector(".merge-status-icon > svg");
      const parent = check.parentElement;

      if (icon && icon.classList.contains(className)) {
        console.log("Moving check to the top");
        parent.removeChild(check);
        parent.prepend(check);
      }
    });
  }

  function reorderChecks() {
    moveOnTop("octicon-skip");
    moveOnTop("octicon-x");
  }

  function maybeWait() {
    if (document.querySelectorAll(".merge-status-item").length === 0) {
      setTimeout(() => maybeWait(), 100);
    } else {
      reorderChecks();
    }
  }

  maybeWait();
})();
