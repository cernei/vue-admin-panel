<template>
    <div id="paginator" v-show="previous || next">
        <nav>
            <ul class="pager">
                <li v-show="previous" class="previous">
                    <a @click.prevent="paginate('previous')" class="page-scroll" href="#">
                        &lt; Previous
                    </a>
                </li>
                <li v-show="next" class="next">
                    <a @click.prevent="paginate('next')" class="page-scroll" href="#">
                        Next &gt;
                    </a>
                </li>
            </ul>
        </nav>
    </div>
</template>