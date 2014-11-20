RestoredProc : filesystem backed backed storedprocs like queries and scripts over REST api

EdgeJs, Scriptcs, MsSql, NodeJs

C# source code compiled by EdgeJS
Extensions .cs should be .csx but OmniSharp doesn't like it.
And Im attempting to use only light editors and no IDE for this project, I think this will help to keep me coding lean, simple, portable, cross-platform.

I've tried to keep the cs/csx compatible between scriptcs,edgejs,omnisharp but small disagreements between them makes it unconfortable.
Like in scriptcs async only with --M mono switch, and edgejs not liking #load 'something.csx', or Omnisharp not paying attention to .csx files;

For that reason cs/csx in this project means , what ever Edge likes. 
that is ok with Omnisharp if the are named .cs.

OmniSharp complains about bad directive @'#load "something", But I Can live with that.
And not so much with just the scriptcs compiler feedback.

OmmiSharp in Sublime needs a .sln file, that is NOT in source control.
It simple needs to be named Random.csx.sln , or yu need to change it in randomCsx.sublime-project
Or follow setup from Omnisharp


Mocha:
Vanilla setup with the exception of test location;
Tests are located aside of what its testing
the pattern is src/**/*.js and its configurable at test/mocha.opts , as expected
There is grunt task watch:tests , it watches tests :), and it runs mocha in the shell... as you would.

