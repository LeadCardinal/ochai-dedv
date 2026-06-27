
$git = 'C:\Program Files\Git\bin\git.exe'
$repo = 'C:\Users\thebo\source\ochai-dev'
& $git -C $repo add -A
& $git -C $repo commit -m "fix tier heights dynamic + step cascade + quartet overflow + applause + asteroid3 removal"
& $git -C $repo push --force origin public
