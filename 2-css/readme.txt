CSS best practices:
1. Same class on same file - BIG NO NO
2. Be specific
   <a><img class='imgClass'></a>
   - .imgClass{rules...} - NOT GOOD
   - a.imgClass{rules...} - GOOD
3. clear class names (length 2-3 words max) - no shortcuts
4. one only team standard - cssClass / CssClass / css-class
    Gong standard is css-class and myId

p {
    color: white;
}

p {
    color: green;
}

.p-class {
    color: yellow;
}

5. Order matters - the last one will override the previous
    - so in the example above, p will be green
6. Class weighs more: .p-class > p
    - so in the example above a p with p-class will be yellow
7. There are scoring rules between classes (cascadingrules)
8. !important - AVOID USING as it is breaks the CSS rules of the team

. Relative length - instead of px
    - em (relative to last known font-size)
    - % (relative to a parent element size that has an absolute size)
    TODO: what is vh/vw ?

. CSS debugging best practices
  - understand the big picture - draw the page elements on a paper
  - validate - e.g. with an online validator - TODO: recommended CSS validator ?
  - duck debugging
  - inspect the website (Chrome dev tools) - do you see the expected styles ?
  - isolate the code - jsfiddle.net / codesandbox.io

Misc
====
. CSS only games: https://codepen.io/jcoulterdesign/pen/NOMeEb
. Text styling
    - font - size, weight, family
    - text-align - e.g. center
    - test-transform - e.g. capitalize
    - line-height - e.g. 40px
    - letter-spacing - e.g. 10px
    - color
    - text-overflow: ellipsis
    - white-space: nowrap
. Display
    - inline - size/width change not affecting
    - inline-block - size change does affect
    - block - not inline
    - run-in
    - none - like invisible
    - flex
    - flex-direction
. float
. position - see https://css-tricks.com/almanac/properties/p/position/
. Layouts
    - Normal
       display, float, position
    - Flexbox - display attributes
        see https://css-tricks.com/snippets/css/a-guide-to-flexbox
        flex-direction - row/column/row-reverse/column-reverse
        flex-grow - <number>
        flex-wrap - no-wrap / wrap / wrap-reverse
        justify-content - flex-start / flex-end / center / space-between / space-around / space-evenly
        align-items - better use with line-height
        align-self
    - Sass vs Less


Final Exercise - CSS Advanced Styling & Selectors
========
Create twitter.com site using only HTML and CSS
    (can use div + display inline-block / inline / float left etc.)
- plan the structure ahead on paper / canvas
- use css debugging of website styles
- use static data instead of server data (also download images)

1. Twitter left side menu
2. Twitter news feed + textarea for tweet update
3. Optional - Right side menu and comment view for a tweet

Final Exercise - Layouts
=======
Change the twitter site styling to flex layout. No display inline or display table

Also more all CSS to use Sass

Also make sure the site it responsive design
Also change some menu and feed design to be different in mobile (not only fit by size)