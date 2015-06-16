var g_VERTEX_SHADER_SRC =
    'attribute vec4 aPos;       \n' +
    'uniform mat4 uMat;   \n' +
    'void main() {\n' +
    '   gl_Position = uMat * aPos;     \n' +
    '}\n';

var g_FRAG_SHADER_SRC =
    'void main() {\n' +
    '   gl_FragColor = vec4(0.0, 1.0, 0.0, 1.0);    \n' +
    '}\n';

function main() {

    var canvas = document.getElementById('example');
    var gl = getWebGLContext(canvas);

    drawRectangle(gl);
    
}

function drawRectangle(gl)
{
    initShaders(gl, g_VERTEX_SHADER_SRC, g_FRAG_SHADER_SRC);
    var pointCount = setupVertexBuffer(gl);
    gl.clearColor(0, 0, 0, 1);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, pointCount);
}

function setupVertexBuffer(gl) {
    var vertices = new Float32Array([
        -0.5, -0.5,
        -0.5, 0.5,
        0.5, -0.5,
        0.5, 0.5
    ]);

    var vertexBuf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuf);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
    var aPos = gl.getAttribLocation(gl.program, 'aPos');
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(aPos);

    var mat = new Matrix4();
    mat.setScale(1.0, 0.5, 1.0);
    mat.rotate(45, 0, 0, 1);
    var uMat = gl.getUniformLocation(gl.program, 'uMat');
    gl.uniformMatrix4fv(uMat, false, mat.elements);

    return Math.floor(vertices.length / 2);
}