var g_VERTEX_SHADER_SRC =
    'attribute vec4 aPos;\n' +
    'uniform mat4 uMat;\n' +
    'void main() {\n' +
    '    gl_Position = uMat * aPos; \n' +
    '}\n';

var g_FRAG_SHADER_SRC =
    'precision mediump float;\n' +
    'uniform vec4 uColor; \n' +
    'void main() {\n ' +
    ' gl_FragColor = uColor; \n' +
    '}\n';

function main()
{
    var canvas = document.getElementById("example");
    var gl = getWebGLContext(canvas);

    initShaders(gl, g_VERTEX_SHADER_SRC, g_FRAG_SHADER_SRC);
    setupVertex(gl);
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
}

function setupVertex(gl)
{
    var mat = new Matrix4();
    mat.setRotate(60, 0, 0, 1);
    mat.translate(0.4, 0, 0);

    var uMatPos = gl.getUniformLocation(gl.program, 'uMat');
    gl.uniformMatrix4fv(uMatPos, false, mat.elements);

    var vertices = new Float32Array([
        0, 0.5,
        -0.5, -0.5,
        0.5, -0.5
    ]);
    var vertexBuf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuf);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
    var aPosLoc = gl.getAttribLocation(gl.program, 'aPos');
    gl.vertexAttribPointer(aPosLoc, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(aPosLoc);

    var uColorLoc = gl.getUniformLocation(gl.program, 'uColor');
    gl.uniform4f(uColorLoc, 0.0, 1.0, 0.0, 1.0);
}