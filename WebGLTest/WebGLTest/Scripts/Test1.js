function main()
{
    var o = null;
    var ret = (o === null);
    console.log(ret);
}

function Foo()
{
    this.a = 1;

    this.show = function()
    {
        test.call(this);
    }
}

function test()
{
    console.log(this.a);
}