"use strict"

//import styles
import "../lib/w3css/w3.css"
import "./style.css"

import $ from "jquery";

//mathjs
import math from "mathjs"
math.import(require("./to_content_mathml"))

var content = document.getElementById("content");

//Get cases
import cases from "../cases/examples.json"

cases.forEach(function(item, i) {
	_createFormulaContainer(item, i)

  const formulaMathjsParse = math.parse(item),
    formulaCMathML = formulaMathjsParse.toCMathML();

  if (formulaMathjsParse && formulaCMathML) {
        $(`#mathJaxTex${i}`).text(`$$${formulaMathjsParse.toTex()}$$`)
        $(`#mathjs${i}`).html(() => {
          return JSON.stringify(formulaMathjsParse, null, 2)
                  .replace(/\n/g, "<br/>")
                  .replace(/ /g, "&nbsp;")
        })
        $(`#textarea${i}`).val(() => {
          return formulaCMathML
                  .toString()
                  .replace(/></g,">\n<")
        })
        $(`#mathJaxCMathMl${i}`).html(formulaCMathML.toString())

        $('<li>')
					.addClass('w3-border')
					.append($('<a>', {href: `case${i}`, text: `Example #${i}: ${item}`}))
					.appendTo($('#navigate'))
    }
});




$('#superCompress').click(() => {
  $(".mathjs").css("height", "300px")
})
$('#fixSuperComress').click(() => {
  $(".mathjs").css("height", "300px")
})
$('#superExpand').click(() => {
	$(".mathjs").css("height", "auto");
})
$('#fixSuperExpand').click(() => {
	$(".mathjs").css("height", "auto");
})

$(".up").click(() => {
	$('html, body').animate({scrollTop: 0},700);
    return false;
})

function _createFormulaContainer(item, i) {
  let container = $('<div>', {'id': `case${i}`}).appendTo($('#content'))

  //Header of
  $('<h2>', {'text': `Example #${i}`}).appendTo(container)

  //Minify btn
  $('<button>')
    .addClass("w3-button w3-circle w3-purple w3-small w3-margin-bottom")
    .click(() => {
      $(`#mathjs${i}`).css("height", "300px")
    })
    .append($('<i>').addClass('fa fa-compress'))
    .appendTo(container)

  //Expand btn
  $('<button>')
    .addClass("w3-button w3-circle w3-indigo w3-small w3-margin-bottom w3-margin-left")
    .click(() => {
      $(`#mathjs${i}`).css("height", "auto")
    })
    .append($('<i>').addClass('fa fa-expand'))
    .appendTo(container)

  $('<h3>', {'text': 'Input:'}).appendTo(container)

  //Native caption formula
  $('<p>', {'text': item}).appendTo(container)
  $('<h3>', {text: 'parsing of input by math.js to Node object:'})
    .addClass('w3-margin-bottom')
    .appendTo(container)

  //div for mathjs-parsed formula
  $('<div>', {'id': `mathjs${i}`})
    .addClass('mathjs w3-margin-bottom')
    .appendTo(container)

  $('<h3>', {text: 'cMathML produced by our code from Node object:'})
    .appendTo(container)

  //textarea for cMathML
  $('<textarea>', {'id': `textarea${i}`})
    .addClass('w3-margin-bottom')
    .appendTo(container)

  $('<h3>', {text: 'MathJax presentation of TeX generated from input:'})
    .appendTo(container)

  //tex-formula
  $('<div>', {'id': `mathJaxTex${i}`})
    .appendTo(container)

  $('<h3>', {text: 'MathJax presentation of cMathML generated by our code:'})
    .appendTo(container)

  //CMathMl-formula
  $('<div>', {'id': `mathJaxCMathMl${i}`})
    .addClass('w3-center')
    .appendTo(container)

  //up
  $('<button>')
    .addClass('w3-padding w3-circle w3-blue-grey w3-button up')
    .append($('<i>').addClass('fa fa-arrow-up'))
    .appendTo(container)

  $('<hr>').appendTo(container)

}
