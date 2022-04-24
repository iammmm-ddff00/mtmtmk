import gsap from 'gsap';

class MouseStalker {

    create() {

        if (window.matchMedia('(min-width:980px)').matches) {
            
            const cursor = document.getElementById('js-cursor');
            const follower = document.getElementById('js-follower');
            
            // カーソル要素座標
            let pos = { x: 0, y: 0 };
            // マウスカーソル座標
            let mouse = { x: pos.x, y: pos.y };
            // スピード
            let speed = 0.5;
            
            // カーソル座標設定
            let cursorSetX = gsap.quickSetter(cursor, 'x', 'px');
            let cursorSetY = gsap.quickSetter(cursor, 'y', 'px');
            
            // 遅延カーソル座標設定
            let followerSetX = gsap.quickSetter(follower, 'x', 'px');
            let followerSetY = gsap.quickSetter(follower, 'y', 'px');
            
            // マウスカーソル座標取得
            document.addEventListener('mousemove', function(event) {
                mouse.x = event.pageX;
                mouse.y = event.pageY;
            });
            
            
            gsap.ticker.add(function() {
                let dt = 1.0 - Math.pow(1.0 - speed, gsap.ticker.deltaRatio()); 
                pos.x += (mouse.x - pos.x) * dt;
                pos.y += (mouse.y - pos.y) * dt;
                cursorSetX(pos.x);
                cursorSetY(pos.y);
                followerSetX(pos.x);
                followerSetY(pos.y);
            });
        
            
            // マウスイベント
            let link = document.getElementsByClassName('js-link');
        
            for(let i = 0; i < link.length; i++) {
            
                link[i].addEventListener('mouseenter', function() {
                    if (this.classList.contains('p-works__itemLink')) {
                        cursor.classList.add('is-activeArrow');
                        follower.classList.add('is-activeArrow');
                    } else {
                        cursor.classList.add('is-active');
                        follower.classList.add('is-active');
                    }
                });
                
                link[i].addEventListener('mouseleave', function() {
                    cursor.classList.remove('is-active', 'is-activeArrow');
                    follower.classList.remove('is-active', 'is-activeArrow');
                });
            }
        }

    }

}

export { MouseStalker };