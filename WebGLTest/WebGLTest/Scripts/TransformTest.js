var g_VERTEX_SHADER_SRC =
  'attribute vec4 a_Position; \n' +
  'uniform mat4 u_Mat; \n' +
  'void main() {\n' +
  '  gl_Position = u_Mat * a_Position;\n' +
  '  gl_PointSize = 10.0;\n' +
  '}\n';

var g_FRAG_SHADER_SRC =
    'void main() {\n' +
    '   gl_FragColor = vec4(0.0, 1.0, 0.0, 1.0);    \n' +
    '}\n';

function main() {

    var canvas = document.getElementById('canvas');
    var gl = getWebGLContext(canvas);
    initShaders(gl, g_VERTEX_SHADER_SRC, g_FRAG_SHADER_SRC);
    var pointCount = setupVertexBuffer(gl);
    gl.clearColor(0.1, 0.5, 0.5, 1);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, pointCount);
}

function setupVertexBuffer(gl) {
    var vertices = new Float32Array([
        0, 0,
        0, 100,
        100, 0,
        100, 100
    ]);

    var vertexBuf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuf);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
    var aPos = gl.getAttribLocation(gl.program, 'a_Position');
    if (aPos < 0) {
        console.log('Fail to get aPos');
        return -1;
    }
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(aPos);

    var uPos = gl.getUniformLocation(gl.program, 'u_Mat');
    if (uPos < 0) {
        console.log("Fail to get uPos");
        return -1;
    }

    var mat = new Matrix4();
    mat.setOrtho(-240, 240, -240, 240, 0, 1);
    mat.lookAt(20, 0, 0, 20, 0, -1, 0, 1, 0);
    //mat.translate(-240, -240, 0);
    //mat.setRotate(45, 0, 0, 1);
    gl.uniformMatrix4fv(uPos, false, mat.elements);

    return 4;
}