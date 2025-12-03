import { CodeLibrary, cleanCode } from './types';

/**
 * HTML 代码库
 */
export const htmlLibrary: CodeLibrary = {
    easy: [
        {
            code: cleanCode(`<!DOCTYPE html>\n<html>\n<head>\n\t<title>Page Title</title>\n</head>\n<body>\n\t<h1>My First Heading</h1>\n\t<p>My first paragraph.</p>\n</body>\n</html>`),
            difficulty: 'easy',
            title: '基本结构',
            tags: ['基础'],
        },
        {
            code: cleanCode(`<a href="https://www.example.com">This is a link</a>`),
            difficulty: 'easy',
            title: '超链接',
            tags: ['基础'],
        },
        {
            code: cleanCode(`<img src="image.jpg" alt="Description of image" width="500" height="600">`),
            difficulty: 'easy',
            title: '图片',
            tags: ['基础'],
        },
    ],

    medium: [
        {
            code: cleanCode(`<table>\n\t<tr>\n\t\t<th>Firstname</th>\n\t\t<th>Lastname</th>\n\t\t<th>Age</th>\n\t</tr>\n\t<tr>\n\t\t<td>Jill</td>\n\t\t<td>Smith</td>\n\t\t<td>50</td>\n\t</tr>\n</table>`),
            difficulty: 'medium',
            title: '表格',
            tags: ['表格'],
        },
        {
            code: cleanCode(`<form action="/action_page.php">\n\t<label for="fname">First name:</label><br>\n\t<input type="text" id="fname" name="fname" value="John"><br>\n\t<label for="lname">Last name:</label><br>\n\t<input type="text" id="lname" name="lname" value="Doe"><br><br>\n\t<input type="submit" value="Submit">\n</form>`),
            difficulty: 'medium',
            title: '表单',
            tags: ['表单'],
        },
        {
            code: cleanCode(`<ul>\n\t<li>Coffee</li>\n\t<li>Tea</li>\n\t<li>Milk</li>\n</ul>`),
            difficulty: 'medium',
            title: '无序列表',
            tags: ['列表'],
        },
    ],

    hard: [
        {
            code: cleanCode(`<canvas id="myCanvas" width="200" height="100" style="border:1px solid #000000;">\nYour browser does not support the HTML canvas tag.\n</canvas>`),
            difficulty: 'hard',
            title: 'Canvas',
            tags: ['绘图'],
        },
        {
            code: cleanCode(`<svg width="100" height="100">\n\t<circle cx="50" cy="50" r="40" stroke="green" stroke-width="4" fill="yellow" />\n</svg>`),
            difficulty: 'hard',
            title: 'SVG',
            tags: ['绘图'],
        },
        {
            code: cleanCode(`<video width="320" height="240" controls>\n\t<source src="movie.mp4" type="video/mp4">\n\t<source src="movie.ogg" type="video/ogg">\nYour browser does not support the video tag.\n</video>`),
            difficulty: 'hard',
            title: '视频播放',
            tags: ['多媒体'],
        },
    ],
};
