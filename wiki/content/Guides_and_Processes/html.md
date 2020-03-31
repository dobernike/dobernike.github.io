# HTML

# Html elements

## html

[https://guide.freecodecamp.org/html/](https://guide.freecodecamp.org/html/)

A simple example of HTML Document

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Page Title</title>
  </head>
  <body>
    <h1>My First Heading</h1>
    <p>My first paragraph.</p>
  </body>
</html>
```

!DOCTYPE html: Defines this document to be HTML5

html: The root element of an HTML page

head: The element contains meta information about the document

title: The element specifies a title for the document

body: The element contains the visible page content

h1: The element defines a large heading

p: The element defines a paragraph

HTML Versions
Since the early days of the web, there have been many versions of HTML

```
Version     Year
HTML        1991
HTML 2.0    1995
HTML 3.2    1997
HTML 4.01   1999
XHTML       2000
HTML5       2014
```

---

## HTML Interview Questions

[https://www.javatpoint.com/html-interview-questions](https://www.javatpoint.com/html-interview-questions)

A list of top frequently asked HTML interview questions and HTML5 interview questions and answers are given below.

1. What is HTML?

HTML stands for Hyper Text Markup Language. It is a language of World Wide Web. It is a standard text formatting language which is used to create and display pages on the Web. It makes the text more interactive and dynamic. It can turn text into images, tables, links.

2. What are Tags?

HTML tags are composed of three things: an opening tag, content and ending tag. Some tags are unclosed tags.

HTML documents contain two things:

content, and
tags
When a web browser reads an HTML document, the browser reads it from top to bottom and left to right. HTML tags are used to create HTML documents and render their properties. Each HTML tags have different properties.

Syntax

```html
<tag> content </tag>
```

Content is placed between tags to display data on the web page.

3. Do all HTML tags have an end tag?

No. There are some HTML tags that don't need a closing tag. For example: <image> tag, <br> tag.

4. What is formatting in HTML?

The HTML formatting is a process of format the text for a better look and feel. It uses different tags to make text bold, italicized, underlined.

5. How many types of heading does an HTML contain?

The HTML contains six types of headings which are defined with the <h1> to <h6> tags. Each type of heading tag displays different text size from another. So, <h1> is the largest heading tag and <h6> is the smallest one. For example:

<h1>Heading no. 1</h1>    
<h2>Heading no. 2</h2>    
<h3>Heading no. 3</h3>    
<h4>Heading no. 4</h4>    
<h5>Heading no. 5</h5>    
<h6>Heading no. 6</h6>

6. How to create a hyperlink in HTML?

The HTML provides an anchor tag to create a hyperlink that links one page to another page. These tags can appear in any of the following ways:

Unvisited link - It is displayed, underlined and blue.
Visited link - It is displayed, underlined and purple.
Active link - It is displayed, underlined and red.

7. Which HTML tag is used to display the data in the tabular form?

The HTML table tag is used to display data in tabular form (row \* column). It also manages the layout of the page, e.g., header section, navigation bar, body content, footer section. Here is the list of tags used while displaying the data in the tabular form:

Tag Description

<table>	It defines a table.
<tr>	It defines a row in a table.
<th>	It defines a header cell in a table.
<td>	It defines a cell in a table.
<caption>	It defines the table caption.
<colgroup>	It specifies a group of one or more columns in a table for formatting.
<col>	It is used with <colgroup> element to specify column properties for each column.
<tbody>	It is used to group the body content in a table.
<thead>	It is used to group the header content in a table.
<tfooter>	It is used to group the footer content in a table.

8. What are some common lists that are used when designing a page?

There are many common lists which are used to design a page. You can choose any or a combination of the following list types:

Ordered list - The ordered list displays elements in numbered format. It is represented by <ol> tag.
Unordered list - The unordered list displays elements in bulleted format. It is represented by <ul> tag.
Definition list - The definition list displays elements in definition form like in dictionary. The <dl>, <dt> and <dd> tags are used to define description list.

9. What is the difference between HTML elements and tags?

HTML elements communicate to the browser to render text. When the elements are enclosed by brackets <>, they form HTML tags. Most of the time, tags come in a pair and surround content.

10. What is semantic HTML?

Semantic HTML is a coding style. It is the use of HTML markup to reinforce the semantics or meaning of the content. For example: In semantic HTML <b> </b> tag is not used for bold statement as well as <i> </i> tag is used for italic. Instead of these we use <strong></strong> and <em></em> tags.

11. What is an image map?

Image map facilitates you to link many different web pages using a single image. It is represented by <map> tag. You can define shapes in images that you want to make part of an image mapping.

12. How to insert a copyright symbol on a browser page?

You can insert a copyright symbol by using &copy; or &#169; in an HTML file.

13. How to create a nested webpage in HTML?

The HTML iframe tag is used to display a nested webpage. In other words, it represents a webpage within a webpage. The HTML <iframe> tag defines an inline frame. For example:

```html
<!DOCTYPE html>
<html>
  <body>
    <h2>HTML Iframes example</h2>
    <p>
      Use the height and width attributes to specify the size of the iframe:
    </p>
    <iframe src="https://www.javatpoint.com/" height="300" width="400"></iframe>
  </body>
</html>
```

14. How do you keep list elements straight in an HTML file?

You can keep the list elements straight by using indents.

15. Does a hyperlink only apply to text?

No, you can use hyperlinks on text and images both. The HTML anchor tag defines a hyperlink that links one page to another page. The "href" attribute is the most important attribute of the HTML anchor tag.

Syntax

```html
<a href="..........."> Link Text </a>
```

16. What is a style sheet?

A style sheet is used to build a consistent, transportable, and well-designed style template. You can add these templates on several different web pages. It describes the look and formatting of a document written in markup language.

17. Can you create a multi-colored text on a web page?

Yes. To create a multicolor text on a web page you can use <font color ="color"> </font> for the specific texts you want to color.

18. Is it possible to change the color of the bullet?

The color of the bullet is always the color of the first text of the list. So, if you want to change the color of the bullet, you must change the color of the text.

19. Explain the layout of HTML?

HTML layout specifies a way in which the web page is arranged.

https://static.javatpoint.com/htmlpages/images/html-layouts.png

Every website has a specific layout to display content in a specific manner.

Following are different HTML5 elements which are used to define the different parts of a webpage.

<header>: It is used to define a header for a document or a section.
<nav>: It is used to define a container for navigation links
<section>: It is used to define a section in a document
<article>: It is used to define an independent, self-contained article
<aside>: It is used to define content aside from the content (like a sidebar)
<footer>: It is used to define a footer for a document or a section

20. What is a marquee?

Marquee is used to put the scrolling text on a web page. It scrolls the image or text up, down, left or right automatically. You should put the text which you want to scroll within the <marquee>......</marquee> tag.

21. How many tags can be used to separate a section of texts?

Three tags are used to separate the texts.

<br> tag - Usually <br> tag is used to separate the line of text. It breaks the current line and conveys the flow to the next line

<p> tag - The <p> tag contains the text in the form of a new paragraph.
<blockquote> tag - It is used to define a large quoted section. If you have a large quotation, then put the entire text within <blockquote>.............</blockquote> tag.
