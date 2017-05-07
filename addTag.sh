# 假设当前文件夹名为dev
tag_type='dev'
mydate=$(date +%Y%m%d)
timestamp=$(date +%H%M)

# 注释，必填项
read -p "comment: ? " answer
until [ -n "$answer" ]
do
	echo '-----------please add the comment-------------'
	read -p "comment: ? " answer
done
comment=$answer

# dev先更新
git pull
git add --all
git commit -m "${comment}"
git push

# 如果文件夹不存在，拉取release项目
cd '..'
if [ ! -d 'release' ]; then
	echo '----------create release project------------'
  git clone 'git@github.com/release.git'
fi
cd 'release'

# 先拉取再删除再复制，避免冲突
git pull

rm -r index.html static
cp -r ../dev/dist/* ./

# 选择是dev还是release
read -p 'tag type, dev or release [d/r] (dev default)? ' answer
if [ "$answer" = "r" ]; then
   tag_type="release"
fi

# 提交后缀，防止重复tag
read -p "tag submit index[current time default] ?" index
if [ -n "$index" ]; then
   timestamp=$index
fi
tag_name="${tag_type}/${mydate}_${timestamp}"

# git 提交并打tag
git add --all
git commit -m "${comment}"
git push
git tag "${tag_name}"
git push origin "${tag_name}"

# 打印tag
echo "copy the follow tagname to submit"
echo "$tag_name"

exit 0
