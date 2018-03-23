<div class="posts">
    <div class="post" ng-repeat="post in ctrl.posts">
        <p class="title-post">{{post.title}}</p>
        <p class="description-post">{{post.description}}</p>
        <div class="img-post">
            <img width="100px" ng-src="{{post.img}}">
        </div>
    </div>
</div>