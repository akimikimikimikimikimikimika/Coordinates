## Coordinates

![Coordinates](resources/icon.png "Coordinates")


Coordinatesは,複数の座標系を見比べられます。  
平面における幾つかの曲線座標系の等値曲線を重ねて見ることができます。

[Coordinates を開く](https://akimikimikimikimikimikimika.github.io/Coordinates/Coord.html "Coordinates")  

[ソースコード](https://github.com/akimikimikimikimikimikimika/Coordinates/ "ソースコード")

### 基本

- デカルト座標系,極座標系は勿論,それ以外の座標系も数種類導入。
- 複数の座標系を並べて比較することができる。

### 座標系

メニューから次の座標系を選択することができる

- **xy** … デカルト座標系  
- **rθ** … 極座標系
- **OB** … 斜交座標系  
- **PB** … 放物線座標系 (u,v)  
	x = (u²-v²)/2  
	y = uv  
	-∞ < u < +∞ , v ≥ 0

- **EP** … 楕円座標系 (u,v)  
	x = a∙cosh(u)cos(v)  
	y = a∙sinh(u)sin(v)  
	u ≥ 0 , -π ≤ v ≤ +π
  
- **BP** … 双極座標系 (u,v)  
	x = a∙sinh(v)/(cosh(v)-cos(u))  
	y = a∙sin(u)/(cosh(v)-cos(u))  
	-π ≤ u ≤ +π , -∞ < v < +∞

### メニュー項目

- **xy**,**rθ**,**OB**,**PB**,**EP**,**BP** (x,y,r,t,o,p,e,bキー)  
	それぞれ上に示した座標系の表示のオン/オフを切り替える
- **C**,**S** (dキー)  
	描画モードを切り替える  
	現在の描画モードに合わせてボタンのラベルが変化する
	* **C** … Canvas 2D
	* **S** … SVG
- **c**,**a**,**v** (mキー)  
	クリック/タップした時の挙動を切り替える  
	現在のモードに合わせてボタンのラベルが変化する
	* **c** … 座標を移動させるモード
	* **a** … 楕円,双極座標系のパラメータaを変えるモード
	* **v** … 斜交座標系の傾きを変えるモード

### 特記事項
- JavaScript,CSSを無効にすると利用できない。
- 同じURLでそのままデスクトップでも,モバイルでも利用できる。
- Internet Explorerでは利用できない。
- iOSデバイスでの実行には, iOS 13 以降が必要。
- iPhone X 対応。

### 更新内容
- 描画モードとして Canvas,SVG に対応
- ソースコードを改良し,圧縮していないソースコードの公開を開始