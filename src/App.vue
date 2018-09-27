<template>
    <div class="wrapper">
        <div id="overlay">
            <div id="loader"></div>
        </div>
        <header class="main-header">
            <!-- Logo -->
            <a href="index2.html" class="logo">
                <!-- mini logo for sidebar mini 50x50 pixels -->
                <span class="logo-mini"><b>A</b>LT</span>
                <!-- logo for regular state and mobile devices -->
                <span class="logo-lg">ADMIN</span>
            </a>
            <!-- Header Navbar: style can be found in header.less -->
            <nav class="navbar navbar-static-top">


            </nav>
        </header>
        <!-- Left side column. contains the logo and sidebar -->
        <aside class="main-sidebar">
            <!-- sidebar: style can be found in sidebar.less -->
            <section class="sidebar">
                <!-- Sidebar user panel -->

                <!-- sidebar menu: : style can be found in sidebar.less -->
                <ul class="sidebar-menu" data-widget="tree">
                    <li class="header">MAIN NAVIGATION</li>
                    <li class="active treeview menu-open">
                        <router-link to="/users">Users</router-link>
                        <ul class="treeview-menu">
                            <li>
                                <router-link to="/groups">Groups</router-link>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <router-link to="/categories">Categories</router-link>
                    </li>
                    <li>
                        <router-link to="/currencies">Currencies</router-link>
                    </li>
                    <li>
                        <router-link to="/stores">Stores</router-link>
                    </li>
                    <li class="active treeview menu-open">
                        <router-link to="/products">Products</router-link>
                        <ul class="treeview-menu">
                            <li>
                                <router-link to="/parts">Parts</router-link>
                            </li>
                            <li>
                                <router-link to="/options">Options</router-link>
                            </li>
                        </ul>
                    </li>

                </ul>
            </section>
            <!-- /.sidebar -->
        </aside>

        <!-- Content Wrapper. Contains page content -->
        <div class="content-wrapper">
            <!-- Content Header (Page header) -->
            <!--     <section class="content-header">
                  <h1>
                    Dashboard
                    <small>Control panel</small>
                  </h1>
                  <ol class="breadcrumb">
                    <li><a href="#"><i class="fa fa-dashboard"></i> Home</a></li>
                    <li class="active">Dashboard</li>
                  </ol>
                </section> -->
            <router-view></router-view>
            <!-- /.content -->
        </div>
        <!-- /.content-wrapper -->
        <footer class="main-footer">
            <div class="pull-right hidden-xs">
                <b>Version</b> 0.1
            </div>
        </footer>
    </div>
</template>

<script>
    export default {

        name: 'app',

    }
</script>

<style>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
    }

    .menu a {

    }

    .menu .router-link-active {
        color: black;
    }

    .menu .router-link-active:hover {
        text-decoration: none;
        color: black;
    }

    #overlay {
        visibility: hidden;
        width: 100%;
        height: 100%;
        position: absolute;
        background: #FFF;
        opacity: 0;
        z-index: 9;
        -moz-transition: visibility 0.1s, opacity 0.1s linear;
        -o-transition: visibility 0.1s, opacity 0.1s linear;
        -webkit-transition: visibility 0.1s, opacity 0.1s linear;
        transition: visibility 0.1s, opacity 0.1s linear;
    }

    #overlay.overlay-active {

        opacity: 0.8;
        visibility: visible;
    }

    #loader {
        position: absolute;
        left: 50%;
        top: 40%;
        z-index: 1;
        width: 150px;
        height: 150px;
        margin: -75px 0 0 -75px;
        border: 16px solid #f3f3f3;
        border-radius: 50%;
        border-top: 16px solid #3498db;
        width: 120px;
        height: 120px;
        -webkit-animation: spin 2s linear infinite;
        animation: spin 2s linear infinite;
    }

    @-webkit-keyframes spin {
        0% {
            -webkit-transform: rotate(0deg);
        }
        100% {
            -webkit-transform: rotate(360deg);
        }
    }

    @keyframes spin {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }


</style>
