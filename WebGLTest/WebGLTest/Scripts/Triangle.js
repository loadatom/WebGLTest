var VSHADER_SRC =
    '    attribute vec4 a_Pos; \n' +
    'void main() {\n' +
    '    gl_Position = a_Pos; \n' +
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

    var n = initBuffer(gl);
    if (n < 0) {
        console.log("Fail to init buffer.");
        return;
    }

    var u_Pos = gl.getUniformLocation(gl.program, 'u_Pos');
    if (!u_Pos) {
        console.log("Fail to get u_Pos loc.");
        return;
    }

    gl.uniform4f(u_Pos, 0.0, 1.0, 0.0, 1.0);
    draw(gl, n);
}

function draw(gl, n)
{
    gl.drawArrays(gl.TRIANGLES, 0, n);
}

function initBuffer(gl)
{
    var vertices = new Float32Array([-0.5, -0.5, 0.5, -0.5, 0, 0.5]);
    var buf = gl.createBuffer();

    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    var a_Pos = gl.getAttribLocation(gl.program, 'a_Pos');
    if (a_Pos < 0) {
        console.log("Fail to get a_Pos loc.");
        return -1;
    }

    gl.vertexAttribPointer(a_Pos, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(a_Pos);
    
    return Math.floor(vertices.length / 2);
}