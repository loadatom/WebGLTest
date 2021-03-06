﻿var VSHADER_SRC =
    'void main() {\n' +
    '   gl_Position = vec4(0.0, 0.0, 0.0, 1.0); \n' +
    '   gl_PointSize = 10.0; \n' +
    '}\n';

var FSHADER_SRC =
    'void main() {\n' +
    '    gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0); \n' +
    '} \n';

function main()
{
    var canvas = document.getElementById('canvas');
    var gl = getWebGLContext(canvas);
    if (!gl) {
        console.log("Fail to get gl");
        return;
    }

    if (!initShaders(gl, VSHADER_SRC, FSHADER_SRC)) {
        console.log("Fail to init shader");
        return;
    }

    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.POINTS, 0, 1);
}

