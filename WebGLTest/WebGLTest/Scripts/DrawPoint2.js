var VSHADER_SRC =
    '    attribute vec4 a_Pos; \n' +
    'void main() {\n' +
    '    gl_Position = a_Pos; \n' +
    '    gl_PointSize = 10.0; \n' +
    '}\n';

var FSHADER_SRC =
    'void main() {\n' +
    '    gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0); \n' +
    '} \n';

function main()
{
    var canvas = document.getElementById("canvas");
    if (!canvas) {
        console.log("Fail to get canvas.");
        return;
    }

    var gl = getWebGLContext(canvas);
    if (!gl) {
        console.log("Fail to get gl context.");
        return;
    }

    if (!initShaders(gl, VSHADER_SRC, FSHADER_SRC)) {
        console.log("Fail to init shaders.");
        return;
    }

    var a_Pos = gl.getAttribLocation(gl.program, 'a_Pos');
    if (a_Pos < 0) {
        console.log("Fail to get a_Pos loc.");
        return;
    }

    gl.vertexAttrib3f(a_Pos, 0.0, 0.0, 0.0);

    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.POINTS, 0, 1);
}