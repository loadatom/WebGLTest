var VSHADER_SRC =
    '    attribute vec4 a_Pos; \n' +
    'void main() {\n' +
    '    gl_Position = a_Pos; \n' +
    '    gl_PointSize = 10.0; \n' +
    '}\n';

var FSHADER_SRC =
    '  precision mediump float; \n' +
    '  uniform vec4 u_Pos; \n' +
    'void main() {\n' +
    '    gl_FragColor = u_Pos; \n' +
    '} \n';

function main() {
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

    gl.clearColor(0.0, 0.0, 0.0, 1.0);

    var a_Pos = gl.getAttribLocation(gl.program, 'a_Pos');
    if (a_Pos < 0) {
        console.log("Fail to get a_Pos loc.");
        return;
    }

    var u_Pos = gl.getUniformLocation(gl.program, 'u_Pos');
    if (!u_Pos) {
        console.log("Fail to get u_Pos loc.");
        return;
    }

    draw(gl, a_Pos, u_Pos);
}

function draw(gl, a_Pos, u_Pos)
{
    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.vertexAttrib3f(a_Pos, 0.0, 0.0, 0.0);
    gl.uniform4f(u_Pos, 1.0, 0.0, 0.0, 1.0);
    gl.drawArrays(gl.POINTS, 0, 1);

    gl.vertexAttrib3f(a_Pos, 0.0, 0.5, 0.0);
    gl.uniform4f(u_Pos, 0.0, 1.0, 0.0, 1.0);
    gl.drawArrays(gl.POINTS, 0, 1);
}