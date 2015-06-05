var g_VERTEX_SHADER_SRC =
    'attribute vec4 aPos;       \n' +
    'void main() {\n' +
    '   gl_Position = aPos;     \n' +
    '   gl_PointSize = 10.0;    \n' +
    '}\n';

var g_VERTEX_SHADER_SRC2 =
  'attribute vec4 a_Position;\n' +
  'void main() {\n' +
  '  gl_Position = a_Position;\n' +
  '  gl_PointSize = 10.0;\n' +
  '}\n';

var g_FRAG_SHADER_SRC =
    'void main() {\n' +
    '   gl_FragColor = vec4(0.0, 1.0, 0.0, 1.0);    \n' +
    '}\n';

function main() {

    var canvas = document.getElementById('example');
    var gl = getWebGLContext(canvas);
    initShaders(gl, g_VERTEX_SHADER_SRC, g_FRAG_SHADER_SRC);
    var pointCount = setupVertexBuffer(gl);
    gl.clearColor(0, 0, 0, 1);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.TRIANGLES, 0, pointCount);
}

function setupVertexBuffer(gl) {
    var vertices = new Float32Array([
        0.0, 0.5,
        -0.5, -0.5,
        0.5, -0.5
    ]);

    var vertexBuf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuf);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
    var aPos = gl.getAttribLocation(gl.program, 'aPos');
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(aPos);

    return 3;
}