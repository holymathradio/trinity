from manimlib import *

import cmath


class CustomFunctionGraph(VMobject):
    def __init__(self, function, x_range=[-1, 1], **kwargs):
        super().__init__(**kwargs)
        self.function = function
        x_min, x_max, x_step = x_range
        if x_step > 0:
            x_values = np.arange(x_min, x_max + x_step, x_step)
        else:
            x_values = np.arange(x_max, x_min - x_step, -x_step)[::-1]
        points = [np.array([x, function(x), 0]) for x in x_values]
        self.set_points_smoothly(points)

class Nicene(Scene):
    def construct(self):
        axes = Axes(
            # x-axis ranges from -1 to 10, with a default step size of 1
            x_range=(-10, 10, 5),
            # y-axis ranges from -2 to 2 with a step size of 0.5
            #y_range=(-2, 2, 0.5),
            # The axes will be stretched so as to match the specified
            # height and width
            height=6,
            width=10,
            # Axes is made of two NumberLine mobjects.  You can specify
            # their configuration with axis_config
            axis_config={
                "stroke_color": GREY_A,
                "stroke_width": 2,
                "include_tip": True
            },
            # Alternatively, you can specify configuration for just one
            # of them, like this.
            y_axis_config={
                "include_tip": False,
                "stroke_color": BLACK
            }
        )
        # Keyword arguments of add_coordinate_labels can be used to
        # configure the DecimalNumber mobjects which it creates and
        # adds to the axes
        axes.add_coordinate_labels(
            font_size=20,
            num_decimal_places=0,
        )
        # self.add(axes)
        axes.shift(-axes.get_center())

        # current height of the frame
        #self.camera.reset_pixel_shape(new_width=1300, new_height= 1300)

        # update the height of the frame
        # text = Text("Here is a text", font="Consolas", font_size=90)

        text0 = Text(
            "The Nicene Creed",
            font="Arial",
            t2f={"font": "Consolas", "words": "Consolas"},
            t2c={"God": YELLOW, "words": GREEN}
        )

        text = Text(
            "I believe in one God,\nthe Father almighty,\nmaker of heaven and earth,\nof all things visible and invisible.",
            font="Arial",
            t2f={"font": "Consolas", "words": "Consolas"},
            t2c={"God": YELLOW, "Father": YELLOW, "words": GREEN}
        )

        nicene2 = Text(
            "I believe in one Lord Jesus Christ,\nthe Only Begotten Son of God,\nborn of the Father before all ages.",
            font="Arial",
            # t2c is a dict that you can choose color for different text
            t2c={"Jesus Christ": YELLOW, "God": YELLOW, "Father": YELLOW, "before all ages": GREY}
        )


        nicene3 = Text(
            "God from God, Light from Light, \ntrue God from true God, begotten, \nnot made, consubstantial with the Father; \nthrough him all things were made.",
            font="Arial",
            # t2c is a dict that you can choose color for different text
            t2c={"God": YELLOW,"Light": YELLOW, "Father": YELLOW, "him": YELLOW}
        )

        nicene3_bis = Text(
            "; through him all things were made.\n \n ",
            font="Arial",
            # t2c is a dict that you can choose color for different text
            t2c={"him": YELLOW}
        )

        #nicene2.set_width(FRAME_WIDTH - 1)
        #VGroup(text, difference).arrange(DOWN, buff=1)
        self.play(Write(text0, run_time=0.1))
        self.wait(5)
        self.play(FadeOut(text0, run_time=0.1))

        self.wait(3)
        self.play(Write(text,run_time = 8))
        self.wait(5)
        self.play(FadeOut(text))
        self.wait(3)
        t = Write(nicene2,run_time = 8)
        self.play(t)

        self.play(nicene2.animate.to_edge(DOWN))
        self.wait(4)

        # create a horizontal line
        linej = Line(start=[-4, 2, 0], end=[-3, 2, 0], color=YELLOW)

        # calculate the shift needed to move the left endpoint of the line to the origin
        shift_vector = np.array([4, 0, 0]) * 1

        self.add(linej)

        # animate the line shifting to the origin
        self.play(linej.animate.shift(shift_vector), run_time = 15)

        # create a Tex object for the label "t=0"
        label_t0 = Text("t = 0", color=GREY, font_size=32).next_to(linej.get_end(), 2*RIGHT, buff=0.5)

        label_t0.align_to(linej, DOWN)

        self.add(label_t0)

        self.play(FadeOut(nicene2),run_time = 15)
        # dot.animate.move_to(axes.c2p(0, 0))

        # create a rectangle that overlaps with the line
        rectangle = Rectangle(height=0.01, width=1, color=YELLOW,stroke_width=0.2)
        rectangle.move_to([0.5, 2-0.005, 0])

        # fill the rectangle with blue color
        rectangle.set_fill(YELLOW, opacity=0)
        # add the line and rectangle to the scene
        self.add(rectangle)

        self.play(Write(nicene3.to_edge(DOWN)), run_time=10)

        top_point = np.array([1, 2, 0])
        bottom_point = np.array([0, 0, 0])
        curve = ArcBetweenPoints( top_point, bottom_point, angle=-TAU / 4, radius=1.5, color=YELLOW)

        top_point = np.array([1, 2, 0])
        bottom_point = np.array([0, 0, 0])

        travel_dot = Dot([0, 0, 0])
        travel_dot.set_opacity(0)

        travel_dot2 = Dot([0, 0, 0])
        travel_dot2.set_opacity(0)

        curve = CurvedArrow( top_point, travel_dot.get_center(), angle=-TAU / 4, radius=1.5,  color=YELLOW)
        curve2 = CurvedArrow(top_point, travel_dot2.get_center(), angle=-TAU / 4, radius=1.5, color=WHITE)

        self.play(AnimationGroup(FadeOut(rectangle.set_fill(YELLOW, opacity=1), scale=10000), AnimationGroup(ShowCreation(curve2),ShowCreation(curve)),lag_ratio=0.2),run_time = 5)
        dotrest = Dot(color='#808080', opacity=1)
        dotrest.move_to(ORIGIN) #axes.c2p(0, 0))

        def update_curve(curve):
            # top_point and travel_dot.get_center() are assumed to be numpy arrays
            distance = np.sqrt((travel_dot.get_center()[0] - 0) ** 2 +
                               (travel_dot.get_center()[1] - 0) ** 2 +
                               (travel_dot.get_center()[2] - 0) ** 2)


            updated_curve = CurvedArrow(top_point, travel_dot.get_center(), angle=-TAU / 4 + ((distance)/6 * TAU / 4 ) , radius=1.5, color=YELLOW)

            #updated_curve.add_tip(arrow_tip)
            curve.become(updated_curve)

        left_point = linej.get_start()
        left_x_coord = left_point[0]

        print("The x-coordinate of the left end-point of linej is:", left_x_coord)

        center_point = axes.get_center()
        center_x_coord = center_point[0]
        center_y_coord = center_point[1]


        print("The coordinates of the center of axes are:", center_x_coord, center_y_coord)

        def update_curve2(curve):
            # top_point and travel_dot.get_center() are assumed to be numpy arrays
            distance = np.sqrt((travel_dot2.get_center()[0] - 0) ** 2 +
                               (travel_dot2.get_center()[1] - 0) ** 2 +
                               (travel_dot2.get_center()[2] - 0) ** 2)


            updated_curve = CurvedArrow(top_point, travel_dot2.get_center(), angle=-TAU / 4 + ((distance)/9 * TAU / 4 ) , radius=1.5, color=WHITE)
            #updated_curve.add_tip(arrow_tip)
            curve.become(updated_curve)

        def update_curve_vanishing(curve):
            # top_point and travel_dot.get_center() are assumed to be numpy arrays
            distance = np.sqrt((travel_dot.get_center()[0] - 0) ** 2 +
                               (travel_dot.get_center()[1] - 0) ** 2 +
                               (travel_dot.get_center()[2] - 0) ** 2)

            updated_curve = CurvedArrow(top_point, travel_dot.get_center(), angle=-TAU / 4 + ((distance) / 6 * TAU / 4),
                                        radius=1.5, color=YELLOW, stroke_opacity=(distance) / 6)
            # updated_curve.add_tip(arrow_tip)
            updated_curve.tip.set_opacity((distance) / 6)

            curve.become(updated_curve)

        def update_curve2_vanishing(curve):
            # top_point and travel_dot.get_center() are assumed to be numpy arrays
            distance = np.sqrt((travel_dot2.get_center()[0] - 0) ** 2 +
                               (travel_dot2.get_center()[1] - 0) ** 2 +
                               (travel_dot2.get_center()[2] - 0) ** 2)

            updated_curve = CurvedArrow(top_point, travel_dot2.get_center(),
                                        angle=-TAU / 4 + ((distance) / 9 * TAU / 4), radius=1.5, color=WHITE, stroke_opacity=(distance) / 9)
            updated_curve.tip.set_opacity((distance) / 9)

            curve.become(updated_curve)


        curve.add_updater(lambda m: update_curve(m))

        curve2.add_updater(lambda m: update_curve2(m))

        print(linej.get_start())
        print(dotrest.get_center())
        print(ORIGIN)

        #line_t = Line(np.array([0, 0, 0]), np.array([0, 2, 0]))
        #self.add(line_t)
        line = Line(np.array([0, 0, 0]), np.array([8, 0, 0]))
        line_rev = Line(np.array([8, 0, 0]), np.array([0, 0, 0]))
        line2 = Line(np.array([0, 0, 0]),np.array([-8, 0, 0]))
        line2_rev = Line(np.array([-8, 0, 0]), np.array([0, 0, 0]))

        # todo avoid overlap seems alright with line_t actually

        seg_created1 = Line(ORIGIN, ORIGIN, color=YELLOW, stroke_width=5, stroke_opacity=0.5)
        seg_created2 = Line(ORIGIN, ORIGIN, color=WHITE, stroke_width=5, stroke_opacity=0.5)

        vanish_offset = 0.08
        # Add updaters to the lines
        seg_created1.add_updater(lambda l: l.put_start_and_end_on(ORIGIN+[vanish_offset,0,0], travel_dot.get_center()).set_opacity(0.5))
        seg_created2.add_updater(lambda l: l.put_start_and_end_on(ORIGIN-[vanish_offset,0,0], travel_dot2.get_center()).set_opacity(0.5))

        # Add the dot and the lines to the scene
        self.add(seg_created1, seg_created2)
        self.add(dotrest)

        seg_created1.put_start_and_end_on(ORIGIN, RIGHT)


        self.play(MoveAlongPath(travel_dot, line),MoveAlongPath(travel_dot2, line2), run_time=10,rate_func = linear)

        seg_created1.clear_updaters()
        seg_created2.clear_updaters()

        curve.add_updater(lambda m: update_curve_vanishing(m))
        curve2.add_updater(lambda m: update_curve2_vanishing(m))
        self.wait(8)

        self.play(MoveAlongPath(travel_dot, line_rev), MoveAlongPath(travel_dot2, line2_rev), run_time=4, rate_func=linear)


        self.play(AnimationGroup(FadeOut(curve),FadeOut(curve2)),run_time=0.1)
        self.wait(4)
        self.play(AnimationGroup(FadeOut(nicene3),FadeOut(seg_created1), FadeOut(seg_created2), FadeOut(dotrest)), run_time=5)
        self.wait(4)

        nicene4 = Text(
            "For us men and for our salvation\n he came down from heaven,\nand by the Holy Spirit was incarnate of the Virgin Mary, \nand became man.",
            font="Arial",
            # t2c is a dict that you can choose color for different text
            t2c={" he ": YELLOW,"Holy Spirit": YELLOW,"came down": GREY}
        )

        self.play(Write(nicene4.to_edge(DOWN)), run_time=10)

        self.wait(4)

        # create a rectangle that overlaps with the line
        rectangle_descending = Rectangle(height=0.01, width=1, color=YELLOW, stroke_width=0)
        rectangle_descending.move_to([0.5, 2-0.005, 0])


        # add the line and rectangle to the scene
        self.add(rectangle_descending)


        # fill the rectangle with blue color
        rectangle_descending.set_fill(GREY, opacity=0.4)

        run_time_rect = 4
        increase_height_anim = UpdateFromFunc(
            rectangle,
            lambda rect: rect.set_height(rect.get_height() + 1, stretch=True).next_to(linej, DOWN, buff=0)
        )

        # Create line
        line_overlap = Line(rectangle_descending.get_corner(DL), rectangle_descending.get_corner(DR), color=YELLOW) #.shift([0,0,-0.001])
        self.add(line_overlap)
        line_overlap.add_updater(lambda l : l.become(Line(rectangle_descending.get_corner(DL), rectangle_descending.get_corner(DR), color=YELLOW).shift([0,0,-0.001])))

        # Play the animation
        self.play(rectangle_descending.animate.set_height(2, stretch=True).next_to(linej, DOWN, buff=0), run_time=15)

        # create a Tex object for the label "t=0"
        label_t1 = Text("t = 1", color=GREY, font_size=32).next_to(line_overlap.get_end(), 2*RIGHT, buff=0.5)

        label_t1.align_to(line_overlap, DOWN)

        self.add(label_t1)

        self.wait(10)

        self.play(label_t1.animate.shift(0.5*UP), run_time=1.5)



        l0 = NumberLine(
            x_range=[-10, 10, 1],
            include_numbers=True,
        )

        # Get the centers of the Axes and l0
        axes_center = axes.get_center()
        l0_center = (l0.get_start() + l0.get_end()) / 2

        dotrest_center = dotrest.get_center()
        # Calculate the shift vectors needed to align the centers with the origin

        l0_shift = axes_center-l0_center

        # Shift the Axes and l0 to align their centers with the origin

        l0.shift(l0_shift)
        dotrest.shift(axes_center-dotrest_center)


        # Create a VGroup containing both objects
        vg = VGroup(l0, line_overlap)

        # Move l0 behind line_overlap
        l0.add_to_back(line_overlap)

        self.play(FadeIn(l0),FadeIn(dotrest),run_time = 3)

        self.wait(10)
        self.play(FadeOut(nicene4))

        self.wait(5)


        nicene5 = Text(
            "For our sake he was crucified under Pontius Pilate,\n he suffered death and was buried, \nand rose again on the third day \nin accordance with the Scriptures.",
            font="Arial",
            # t2c is a dict that you can choose color for different text
            t2c={" he ": YELLOW,"Holy Spirit": YELLOW,"came down": GREY}
        )

        # Rotate the line by 90 degrees around the y-axis

        rot_matrix = np.array([[1, 0, 0], [0, 0, -1], [0, 1, 0]])


        group_to_rot = Group(rectangle_descending, label_t0, linej, l0, label_t1)

        def update_width(line):
            # Define a lambda function to update the width of the line as it rotates
            coordinate = linej.get_start()
            origin = np.array([0, 0, 0])
            projected = np.array([0,coordinate[1],coordinate[2]])
            angle = np.arctan(coordinate[2]/coordinate[1])
            #print(1 + 0.2 * abs(np.cos(angle / 3)))
            linej_new = Line(start=line.get_start(), end=line.get_start() + [1 - 0.21 * abs(np.sin(angle)),0,0], color=YELLOW,stroke_width=2-0.5 * abs(np.sin(angle)))
            line.become(linej_new)

            #line.set_width(1 - 0.3 * abs(np.sin(angle)))



        def get_angle() :
            # Define a lambda function to update the width of the line as it rotates
            coordinate = linej.get_start()
            origin = np.array([0, 0, 0])
            projected = np.array([0, coordinate[1], coordinate[2]])
            angle = np.arctan(coordinate[2] / coordinate[1])
            return angle


        def update_visibility(rect):
            angle = get_angle()
            rect.set_fill(GREY, opacity= 0.2- 0.2 * abs(np.sin(angle)))
            rect

        def update_visibility_line(line):
            angle = get_angle()
            line.set_opacity(1- 1 * abs(np.sin(angle)))
            line


        self.play(Write(nicene5.to_edge(DOWN)), run_time=8)
        linej.add_updater(lambda m: update_width(m) )
        rectangle_descending.add_updater(lambda m: update_visibility(m))
        l0.add_updater(lambda m: update_visibility_line(m))
        dotrest.add_updater(lambda m: update_visibility_line(m))
        label_t1.add_updater(lambda m: update_visibility_line(m))
        label_t0.add_updater(lambda m: update_visibility_line(m))
        self.play(Succession(group_to_rot.animate.apply_matrix(rot_matrix),AnimationGroup(FadeOut(dotrest), FadeOut(rectangle_descending),FadeOut(linej), FadeOut(l0), FadeOut(label_t0), FadeOut(label_t1))),run_time=10)
        #prevent line_overlap to dissapear
        vg.remove(line_overlap)
        self.add(line_overlap)
        #self.add(dot_center)
        dotl = Dot(linej.get_start())
        origin = np.array([0, 0, 0])
        vec_to_dot = dotl.get_center() - origin
        unit_vec_to_dot = vec_to_dot / np.linalg.norm(vec_to_dot)
        angle = np.arccos(np.dot(unit_vec_to_dot, [0, 0, 1]))
        print(angle)
        self.wait(10)

        # 3 days res

        # Create a dot at (1, 1)
        dot_angel = Dot(np.array([1, 0, 0]), radius=0.04)
        self.add(dot_angel)

        # Create a unit circle
        circle = Circle(radius=1,fill_opacity = 0, stroke_opacity = 0)
        self.add(circle)

        group2 = Group(circle, line_overlap)
        #axes, l0,



        line_overlap.clear_updaters()



        arc = ArcBetweenPoints(start=1 * RIGHT, end=1 * RIGHT, stroke_color=YELLOW)
        round = 1

        def update_arc(arc):
            center = circle.get_center()
            radius = circle.get_width() / 2
            #angle = dot_angel.get_angle()
            angle = np.arctan2(dot_angel.get_y()-center[1], dot_angel.get_x()-center[0])

            #
            end_point = line_overlap.get_end()

            rightmost_x = circle.get_center()[0] + circle.get_width() / 2 #rightmost_x #np.array([x, y, 0])
            if round==1:
                x = center[0] + radius * np.cos(np.pi / 3)
                y = center[1] + radius * np.sin(np.pi / 3)
                if angle==0:
                    new_arc = arc

                elif angle <= PI / 3 and angle > 0 and dot_angel.get_y() >= circle.get_center()[1]:
                    new_arc = ArcBetweenPoints(start=end_point, end=dot_angel.get_center(), stroke_color=GREY, angle=angle, radius=radius, stroke_opacity = 0.3)
                else:
                    new_arc = ArcBetweenPoints(start=end_point, end=np.array([x, y, 0]), stroke_color=GREY,
                                                  angle=PI/3, radius=radius, stroke_opacity = 0.3)
            elif round==2:
                if angle <= PI / 3 and angle >= 0 and dot_angel.get_y() >= circle.get_center()[1]:
                    x = center[0] + radius * np.cos(np.pi / 3)
                    y = center[1] + radius * np.sin(np.pi / 3)
                    #new_arc = ArcBetweenPoints(start=end_point, end=np.array([x, y, 0]), stroke_color=GREY,
                    #                           angle=PI / 3, radius=radius, stroke_opacity=0.3)
                    new_arc = arc
                elif angle <= 2*PI / 3 and angle > 0 and dot_angel.get_y() >= circle.get_center()[1]:
                    new_arc = ArcBetweenPoints(start=end_point, end=dot_angel.get_center(), stroke_color=GREY,
                                               angle=angle, radius=radius, stroke_opacity=0.3)
                else:
                    x = center[0] + radius * np.cos(2 * np.pi / 3)
                    y = center[1] + radius * np.sin(2 * np.pi / 3)
                    new_arc = ArcBetweenPoints(start=end_point, end=np.array([x, y, 0]), stroke_color=GREY,
                                                   angle=2*PI/3, radius=radius, stroke_opacity = 0.3)
            else:
                if angle <= 2*PI / 3 and angle >= 0 and dot_angel.get_y() >= circle.get_center()[1]:
                    x = center[0] + radius * np.cos(2*np.pi / 3)
                    y = center[1] + radius * np.sin(2*np.pi / 3)
                    #new_arc = ArcBetweenPoints(start=end_point, end=np.array([x, y, 0]), stroke_color=GREY,
                    #                          angle=2*PI / 3, radius=radius, stroke_opacity=0.3)
                    new_arc=arc
                elif dot_angel.get_y() > circle.get_center()[1]:
                    new_arc = ArcBetweenPoints(start=end_point, end=dot_angel.get_center(), stroke_color=GREY,
                                               angle=angle, radius=radius, stroke_opacity=0.3)

                else:
                    x = center[0] + radius * np.cos(3 * np.pi / 3)
                    y = center[1] + radius * np.sin(3 * np.pi / 3)
                    new_arc = ArcBetweenPoints(start=end_point, end=np.array([x, y, 0]), stroke_color=GREY,
                                                   angle=3*PI/3, radius=radius, stroke_opacity = 0.3)

            arc.become(new_arc)


        arc.add_updater(lambda m: update_arc(m) )


        # Group the circle, line, and Axes objects together
        group = Group(circle, line_overlap,dot_angel)

        self.add(arc)

        # Scale the group
        self.play(
            group.animate.shift(np.array([0, 1, 0])).scale(2),MoveAlongPath(dot_angel, circle, rate_func=linear),
            run_time=10
        )
        round = 2
        # Animate the dot to move around the unit circle three times
        self.play(
            MoveAlongPath(dot_angel, circle, rate_func=linear),

            run_time=10
        )
        round = 3
        self.play(
            MoveAlongPath(dot_angel, circle, rate_func=linear),
            run_time=10
        )

        screen_rect = Rectangle(
            width=20,
            height=20,
            fill_color=WHITE,
            fill_opacity=0.6,
            stroke_width=0
        )

        # display :
        center = circle.get_center()
        radius = circle.get_width() / 2
        # angle = dot_angel.get_angle()
        angle = np.arctan2(dot_angel.get_y() - center[1], dot_angel.get_x() - center[0])

        end_point = line_overlap.get_end()
        x = center[0] + radius * np.cos(3 * np.pi / 3)
        y = center[1] + radius * np.sin(3 * np.pi / 3)
        new_arc = ArcBetweenPoints(start=end_point, end=np.array([x, y, 0]), stroke_color=GREY,
                                   angle=3 * PI / 3, radius=radius, stroke_opacity=0.3)
        arc.become(new_arc)

        font_size = l0.numbers[0].font_size

        l1 = NumberLine(
            x_range=[-10, 10, 1],
            include_numbers=False,
             unit_size = 2,  decimal_number_config={'font_size':120,'num_decimal_places': 0}
        )
        l1.add_numbers(font_size= 32)

        # Get the centers of the Axes and l0
        c_center = line_overlap.get_start()
        l1_center = (l1.get_start() + l1.get_end()) / 2


        # Calculate the shift vectors needed to align the centers with the origin

        l1_shift = c_center-l1_center

        # Shift the Axes and l0 to align their centers with the origin

        l1.shift(l1_shift)


        # Create a dot at (1, 1)
        dot_center = Dot(c_center)



        ltemp = line_overlap.copy()
        self.add(ltemp)

        self.play(FadeIn(screen_rect),FadeOut(dot_angel),run_time = 3)



        vg1 = VGroup(l1, line_overlap)

        # Move l0 behind line_overlap
        l1.add_to_back(line_overlap)

        self.play(FadeOut(screen_rect),FadeIn(vg1),FadeIn(dot_center), run_time=3) #l1

        self.remove(ltemp)

        self.wait(4)


        self.play(FadeOut(nicene5, run_time=2))

        self.wait(5)

        nicene6 = Text(
            "He ascended into heaven and \nis seated at the right hand of the Father.",
            font="Arial",
            # t2c is a dict that you can choose color for different text
            t2c={"He": YELLOW,"right hand": BLUE,"Father": YELLOW}
        )



        self.play(Write(nicene6.to_edge(DOWN).shift(0.5*UP), run_time=8))


        # create a rectangle that overlaps with the line
        rectangle = Rectangle(height=0.01, width=1, color=YELLOW,stroke_width=0.2)
        rectangle.move_to([0.5, 2-0.005, 0])

        dot_creator = dot_angel.copy()

        dot_center =Dot(line_overlap.get_start(),opacity=0)
        dot_creator.set_opacity(opacity=0)


        def get_angle_rotation() :
            # Define a lambda function to update the width of the line as it rotates
            #coordinate = linej.get_start()
            center = circle.get_center()
            angle = np.arctan2(dot_creator.get_y() - center[1], dot_creator.get_x() - center[0])
            return angle


        def update_rot_line(line):
            nl = NumberLine(
                x_range=[-10, 10, 1],
                #include_numbers=True,
                unit_size=2,
                tick_size= 0.01, longer_tick_multiple= 10, numbers_with_elongated_ticks= [1]
            )

            nl.rotate(angle=get_angle_rotation())
            # Get the centers of the Axes and l0
            c_center = line_overlap.get_start()
            nl_center = (nl.get_start() + nl.get_end()) / 2

            # Calculate the shift vectors needed to align the centers with the origin
            nl_shift = c_center - nl_center

            # Shift the Axes and l0 to align their centers with the origin
            nl.shift(nl_shift)

            line.become(nl)

        l_rotating = l1.copy().set_opacity(0)

        self.add(l_rotating)

        self.add(line_overlap)
        self.add(dot_center)
        l_rotating.set_opacity(1)

        label_x = 1.45
        dot_rot_label = Dot(l_rotating.n2p(label_x), opacity=1,radius = 0.06, fill_color = BLUE,stroke_color=GREY)

        dot_rot_label_neg = Dot(l_rotating.n2p(-label_x), opacity=1, radius=0.06, fill_color=GREY, stroke_color=GREY)

        print([(dot_creator.get_center() - dot_center.get_center())[1],-(dot_creator.get_center() - dot_center.get_center())[0],0])
        # create a Tex object for the label "t=0"
        #label_reio = Text("t", color=GREY, font_size=32).next_to(dot_rot_label, 2 * RIGHT, buff=0.5)

        angle = get_angle_rotation()

        font_size_rotating = 38

        label_reio =TexText("""
                         $x $
                    """, font_size =font_size_rotating,color=BLUE).shift(dot_rot_label.get_center() + np.array([(dot_rot_label.get_center() - dot_center.get_center())[1],-(dot_rot_label.get_center() - dot_center.get_center())[0],0])/5)#next_to(dot_rot_label, np.array([(dot_rot_label.get_center() - dot_center.get_center())[1],-(dot_rot_label.get_center() - dot_center.get_center())[0],0])/5, buff=0.5)

        def label_reio_update(l):
            lreio_shift = dot_rot_label.get_center() + np.array([(dot_rot_label.get_center() - dot_center.get_center())[1],-(dot_rot_label.get_center() - dot_center.get_center())[0],0])/5
            angle = get_angle_rotation()
            if angle < 0.001:
                rest = 1
            else:
                rest = np.around(1/(angle/PI),decimals=2)
            if angle < 0.001:
                new_label = TexText("""$x$""", font_size=font_size_rotating, color=BLUE).shift(lreio_shift)  # next_to(dot_rot_label, lreio_shift, buff=0.5)
            elif rest == 1.0:
                new_label = TexText("""
                                                     $xe^{i\\theta}, \\theta < \\pi $""", font_size=font_size_rotating, color=BLUE).shift(lreio_shift)  # next_to(dot_rot_label, lreio_shift, buff=0.5)
            else:
                new_label = TexText("""
                         $xe^{i\\theta}, \\theta =\\frac{\\pi}{""" + str(rest) + """}$
                    """, font_size =font_size_rotating, color=BLUE).shift(lreio_shift) #next_to(dot_rot_label, lreio_shift, buff=0.5)
#str(rest)
            l.become(new_label)

        label_reio_neg = TexText("""
                                 $-x $
                            """, font_size=font_size_rotating, color=GREY).shift(dot_rot_label.get_center() - 2*(dot_rot_label.get_center() - dot_center.get_center()) + np.array(
                [(dot_rot_label.get_center() - dot_center.get_center())[1],
                 (dot_rot_label.get_center() - dot_center.get_center())[0], 0]) / 5)

            #.next_to(Dot(dot_rot_label.get_center() - 2*(dot_rot_label.get_center() - dot_center.get_center()),opacity=0), np.array(
            #    [(dot_rot_label.get_center() - dot_center.get_center())[1],
            #     (dot_rot_label.get_center() - dot_center.get_center())[0], 0]) / 5, buff=0.5)

        def label_reio_update_neg(l):
            lreio_shift = dot_rot_label.get_center() - 2*(dot_rot_label.get_center() - dot_center.get_center()) + np.array(
                [(dot_rot_label.get_center() - dot_center.get_center())[1],
                 (dot_rot_label.get_center() - dot_center.get_center())[0], 0]) / 5
            angle = get_angle_rotation()
            rest = np.around(1 / (angle / PI), decimals=2)
            if angle < 0.001:
                rest = 1
            else:
                rest = np.around(1/(angle/PI),decimals=2)
            if angle < 0.001:
                new_label = TexText("""$-x$""", font_size=font_size_rotating, color=GREY).shift(
                    lreio_shift)  # next_to(dot_rot_label, lreio_shift, buff=0.5)
            elif rest == 1.0:
                new_label = TexText("""
                                                         $-xe^{i\\theta}, \\theta < \\pi $""", font_size=font_size_rotating,
                                    color=GREY).shift(lreio_shift)  # next_to(dot_rot_label, lreio_shift, buff=0.5)
            else:
                new_label = TexText("""
                             $-xe^{i\\theta}, \\theta =\\frac{\\pi}{""" + str(rest) + """}$
                        """, font_size=font_size_rotating, color=GREY).shift(
                    lreio_shift)  # next_to(dot_rot_label, lreio_shift, buff=0.5)
            l.become(new_label)

        l_right = Line(dot_center, dot_center.get_center() + 10 * (dot_creator.get_center() - dot_center.get_center()),
                       color=YELLOW, opacity = 0, stroke_opacity = 0)
        l_left = Line(dot_center, dot_center.get_center() - 10 * (dot_creator.get_center() - dot_center.get_center()),
                       color=GREY, opacity=0.4, stroke_opacity=0.2)


        l_right_fixed = l_right.copy().set_stroke(opacity=0.2)

        self.add(l_right_fixed)
        self.add(l_right)


        # make sure opacity is well done with line transparent at start and end position
        self.add(l_left)
        #triangle with shifted points
        size_tri = 40
        size_unit_ratio = 20
        ratio_increase = 1.2

        triangle_y = Polygon(dot_center.get_center(), dot_center.get_center() + [10, 0, 0],
                             dot_center.get_center() + 5 * (dot_creator.get_center() - dot_center.get_center()),
                             color=YELLOW, stroke_opacity=0).set_fill(YELLOW, opacity=0)

        triangle_g = Polygon(dot_center.get_center(), dot_center.get_center() - [10, 0, 0],
                             dot_center.get_center() - [10, 20, 0],
                             dot_center.get_center() - 5 * (dot_creator.get_center() - dot_center.get_center()) - [0,
                                                                                                                   20,
                                                                                                                   0],
                             dot_center.get_center() - 5 * (dot_creator.get_center() - dot_center.get_center()),
                             color=GREY, stroke_opacity = 0).set_fill(GREY, opacity=0.0)

        self.add(triangle_y)
        self.add(triangle_g)
        self.add(dot_rot_label)
        self.add(dot_rot_label_neg)

        def is_start_rotation():
             return dot_creator.get_center()[1] - dot_center.get_center()[1] <0.01

        # do not show the rotating line on the axis either because it will double the fixed line or show the negative line as yellow
        def update_l_right(m):

            if is_start_rotation() :
                m.become(
                    Line(dot_center, dot_center.get_center() + size_unit_ratio * (dot_creator.get_center() - dot_center.get_center()),
                         color=YELLOW, opacity=0, stroke_opacity=0))
                #print("Hello")
            else:
                m.become(
                    Line(dot_center, dot_center.get_center() + size_unit_ratio * (dot_creator.get_center() - dot_center.get_center()),
                         color=YELLOW, opacity=0.4, stroke_opacity=0.3))


        l_right.add_updater(lambda m: update_l_right(m))

        l_left.add_updater(lambda m: m.become(Line(dot_center, dot_center.get_center() - size_unit_ratio * (dot_creator.get_center() - dot_center.get_center()),
                       color=GREY, opacity=0.4, stroke_opacity=0.3)))

        l_rotating.add_updater(lambda m: update_rot_line(m))



        def update_triangle_y(t):
            if is_start_rotation() and dot_creator.get_center()[0] >0:
                #new_t =Polygon(dot_center.get_center(), dot_center.get_center() - [size_tri, 0, 0],
                #    dot_center.get_center() - 20 * (dot_creator.get_center() - dot_center.get_center()),
                #    color=GREY, stroke_width=0).set_fill(GREY, opacity=0.2)
                new_t = Polygon(dot_center.get_center(), dot_center.get_center() + [10, 0, 0],
                        dot_center.get_center() + 5 * (dot_creator.get_center() - dot_center.get_center()),
                        color=YELLOW, stroke_opacity = 0).set_fill(YELLOW, opacity=0)
            else:
                new_t = Polygon(dot_center.get_center(), dot_center.get_center()  + [size_tri,0,0], dot_center.get_center()  + [size_tri,ratio_increase*size_tri,0],
                           dot_center.get_center() + size_unit_ratio * (dot_creator.get_center() - dot_center.get_center()) + [0,ratio_increase*size_tri,0],
                             dot_center.get_center() + size_unit_ratio * (dot_creator.get_center() - dot_center.get_center()),
                           color=YELLOW, stroke_width=0).set_fill(YELLOW, opacity=0.2)
            t.become(new_t)

        triangle_y.add_updater(lambda t: update_triangle_y(t))

        def update_triangle_g(t):
            if dot_creator.get_center()[0] >0.4:
                new_t =Polygon(dot_center.get_center(), dot_center.get_center() - [size_tri, 0, 0],
                    dot_center.get_center() - 20 * (dot_creator.get_center() - dot_center.get_center()),
                    color=GREY, stroke_width=0).set_fill(GREY, opacity=0.2)
            else:
                new_t = Polygon(dot_center.get_center(), dot_center.get_center()  - [size_tri,0,0],
                                                           dot_center.get_center() - [size_tri, ratio_increase*size_tri, 0],
                                                           dot_center.get_center() - size_unit_ratio * (
                                                                       dot_creator.get_center() - dot_center.get_center()) - [
                                                               0, ratio_increase*size_tri, 0],
                             dot_center.get_center() - size_unit_ratio * (dot_creator.get_center() - dot_center.get_center()),
                           color=GREY, stroke_width=0).set_fill(GREY, opacity=0.2)
            t.become(new_t)

        triangle_g.add_updater(lambda t : update_triangle_g(t))

        self.play(FadeIn(label_reio), FadeIn(label_reio_neg),FadeIn(dot_rot_label),FadeIn(dot_rot_label_neg), run_time=2)


        label_reio.add_updater(lambda m: label_reio_update(m))
        label_reio_neg.add_updater(lambda m: label_reio_update_neg(m))


        dot_rot_label.add_updater(
            lambda d: d.become(Dot(l_rotating.n2p(label_x), opacity=1, radius=0.06, fill_color=BLUE, stroke_color=GREY)))

        dot_rot_label_neg.add_updater(
            lambda d: d.become(Dot(l_rotating.n2p(-label_x), opacity=1, radius=0.06, fill_color=GREY, stroke_color=GREY)))

        angle = get_angle_rotation()
        self.wait(8)

        # Create path for dot to go through
        center = circle.get_center()
        radius = circle.get_width() / 2
        # angle = dot_angel.get_angle()
        angle = np.arctan2(dot_angel.get_y() - center[1], dot_angel.get_x() - center[0])
        end_point = line_overlap.get_end()
        x = center[0] + radius * np.cos(3 * np.pi / 3)
        y = center[1] + radius * np.sin(3 * np.pi / 3)
        #dot path on heaven
        dot_h_path = ArcBetweenPoints(start=end_point, end=np.array([x, y, 0]), stroke_color=GREY,
                                           angle=2.9 * PI / 3, radius=radius, stroke_opacity=0.3, fill_color=YELLOW)

        dot_h_path.set_fill(color=YELLOW, opacity= 1)

        rectangle_h = Rectangle(height=0.02, width=radius/4, color=YELLOW,stroke_width=0.2)
        rectangle_h.move_to([line_overlap.get_end()[0]-line_overlap.get_start()[0], line_overlap.get_end()[1]-0.005, 0])


        # fill the rectangle with blue color
        rectangle_h.set_fill(YELLOW, opacity=0)
        # add the line and rectangle to the scene
        self.add(rectangle_h)


        self.play(
            AnimationGroup(FadeOut(rectangle_h.set_fill(YELLOW, opacity=1), scale=10000),AnimationGroup(FadeIn(dot_center),MoveAlongPath(dot_creator, dot_h_path, rate_func=linear)),lag_ratio=0.2),

            run_time=10
        )



        self.wait(6)

        triangle_y.clear_updaters()
        triangle_g.clear_updaters()

        x1 = center[0] + radius * np.cos(np.pi / 2)
        y1 = center[1] + radius * np.sin(np.pi / 2)
        dot_h_path_back = ArcBetweenPoints(start=np.array([x, y, 0]), end=np.array([x1, y1, 0]), stroke_color=GREY,
                                      angle=- PI / 2, radius=radius, stroke_opacity=0.3, fill_color=YELLOW)

        self.play(
            MoveAlongPath(dot_creator, dot_h_path_back, rate_func=linear),

            run_time=5
        )

        def make_imaginary(line):
            nl = NumberLine(
                x_range=[-10, 10, 1],
                # include_numbers=True,
                unit_size=2,
                tick_size=0.01, longer_tick_multiple=10, numbers_with_elongated_ticks=[1]
            )

            nl.rotate(angle=get_angle_rotation())
            # Get the centers of the Axes and l0
            c_center = line_overlap.get_start()
            nl_center = (nl.get_start() + nl.get_end()) / 2

            # Calculate the shift vectors needed to align the centers with the origin
            nl_shift = c_center - nl_center

            # Shift the Axes and l0 to align their centers with the origin
            nl.shift(nl_shift)

            line.become(nl)

        l_ima = l1.copy()
        make_imaginary(l_ima)

        self.add(l_ima)

        self.add(dot_center)

        label_i = TexText("""
                             $1i$
                        """, color=WHITE, font_size=36).next_to(l_ima.n2p(1), 0.5*RIGHT, buff=0.5)
        #Text("1.i"
        self.add(label_i)

        self.wait(4)

        dot_h_path_back_step2 = ArcBetweenPoints(start=np.array([x1, y1, 0]), end=end_point, stroke_color=GREY,
                                           angle=- PI / 2, radius=radius, stroke_opacity=0.3, fill_color=YELLOW)

        self.play(
            MoveAlongPath(dot_creator, dot_h_path_back_step2, rate_func=linear),

            run_time=5
        )

        self.play(FadeOut(label_reio),FadeOut(label_reio_neg),FadeOut(dot_rot_label),FadeOut(dot_rot_label_neg), run_time=1)

        self.add(line_overlap)
        self.add(dot_center)

        text_plus = Text("+",color=YELLOW, font_size=120)
        text_minus = Text("-", color=WHITE, font_size=120)
        self.wait(6)
        text_plus.move_to(l1.n2p(0)+l1.n2p(2)-l1.n2p(0)+l_ima.n2p(1)-l_ima.n2p(0))
        text_minus.move_to(l1.n2p(0)+l1.n2p(-2)-l1.n2p(0) + l_ima.n2p(-1)-l_ima.n2p(0))


        self.play(FadeIn(text_plus),FadeIn(text_minus), run_time=3)
        #self.add(text2)

        l_cross_up = Line(Dot(l_ima.n2p(-2)), Dot(l_ima.n2p(1.05)),stroke_width=20,color=WHITE, opacity=0.6, stroke_opacity=0.6)
        l_cross_left = Line(Dot(l1.n2p(1.05)), Dot(l1.n2p(-1.05)), stroke_width=20, color=WHITE, opacity=0.6,
                          stroke_opacity=0.6)

        screen_rect_cross = Rectangle(
            width=20,
            height=20,
            fill_color=WHITE,
            fill_opacity=0.9,
            stroke_width=0
        )

        g = Group(l_cross_up,l_cross_left)
        self.wait(6)
        self.play(FadeIn(screen_rect_cross),FadeIn(g),run_time = 0.5)

        self.play(FadeOut(screen_rect_cross),FadeOut(g),run_time=2)

        self.wait(4)
        self.play(FadeOut(nicene6),run_time=4)

        self.wait(8)


        nicene7 = Text(
            "He will come again in glory to judge\n the living and the dead and\n his kingdom will have no end.",
            font="Arial",
            # t2c is a dict that you can choose color for different text
            t2c={"He": YELLOW,"the living and the dead": RED,"his kingdom": YELLOW}
        )

        text_background = Rectangle(
            width=10,
            height=2,
            fill_color=BLACK,
            fill_opacity=1,
            stroke_opacity=0,
        )

        text_background.to_edge(DOWN).shift(0.3*DOWN)

        self.play(FadeIn(text_background),run_time=2)

        self.play(Write(nicene7.to_edge(DOWN).shift(0.1*DOWN), run_time=8)) #.shift(0.5*UP)

        # Get the centers of the Axes and l0
        c_center = line_overlap.get_start()


        color_dot =RED
        radius_dot = 0.07
        opacity_dot =1
        # Create a dot at (1, 1)
        dot_judged = Dot(c_center, opacity = opacity_dot, radius = radius_dot, fill_color = color_dot, stroke_color = color_dot)

        #point is being judge
        self.play(FadeIn(dot_judged), run_time = 1)

        l_judge_s1 = Line(Dot(l1.n2p(0)), Dot(l1.n2p(1)), stroke_width=20, color=WHITE, opacity=0.6,
                          stroke_opacity=0.6)
        l_judge_s2 = Line(Dot(l1.n2p(1)), Dot(l1.n2p(-1)), stroke_width=20, color=WHITE, opacity=0.6,
                        stroke_opacity=0.6)

        l_judge_s4 = Line(Dot(l1.n2p(-1)), Dot(l1.n2p(0.8)), stroke_width=20, color=WHITE, opacity=0.6,
                        stroke_opacity=0.6)



        self.play(MoveAlongPath(dot_judged,l_judge_s1), run_time=3,rate_func = linear)
        self.play(MoveAlongPath(dot_judged, l_judge_s2), run_time=6, rate_func=linear)
        self.play(MoveAlongPath(dot_judged, l_judge_s4), run_time=4.8, rate_func=linear)
        self.wait(1)


        def retract_line_truedot(dot_r):
            dcenter = dot_r.get_center()
            dshift = dot_r.get_radius()

            center = circle.get_center()
            radius = circle.get_width() / 2

            x = dcenter[0]
            y = dcenter[1] + radius*np.sqrt(1- (dcenter[0]-center[0])*(dcenter[0]-center[0])/(radius*radius) ) # radius np.sin(np.pi / 3)

            return Dot([x,y,0])

        def retract_line(dot_r):
            dcenter = dot_r.get_center()
            dshift = dot_r.get_radius()

            center = circle.get_center()
            radius = circle.get_width() / 2

            x = dcenter[0]
            y = dcenter[1] + radius*np.sqrt(1- (dcenter[0]-center[0])*(dcenter[0]-center[0])/(radius*radius) ) # radius np.sin(np.pi / 3)

            return Line(dot_r, Dot([x,y+dshift,0]), stroke_width=20, color=WHITE, opacity=0,
                 stroke_opacity=0)

        # Set the seed to a specific value
        np.random.seed(123)

        dots = []
        for i in range(200):
            point = np.random.uniform(2*line_overlap.get_start() - line_overlap.get_end(), line_overlap.get_end())
            dot = Dot(point, opacity = opacity_dot, radius = radius_dot, fill_color = color_dot, stroke_color = color_dot)
            dots.append(dot)

        self.add(line_overlap)
        self.add(dot_center)  # trying to get dot in front
        self.add(dot_judged)

        # Make all dots appear except the one that has already appeared
        appear_dots = [FadeIn(dot) for dot in dots]

        dots.append(dot_judged)

        dots = sorted(dots, key=lambda d: -d.get_center()[0])

        positive_x_indexes = [i for i, dot in enumerate(dots) if dot.get_center()[0] >0]
        negative_x_indexes = [i for i, dot in enumerate(dots) if dot.get_center()[0] <= 0]

        y_project = dots[0].get_center()[1]

        def project_dot(dot):
            dotc = dot.copy()
            yshift = dot.get_center()[1]-y_project
            dotc.shift([0, -yshift, 0])
            return dotc

        def create_life_line(dot1, dot2):
            return Line(dot1, dot2, stroke_width=2, color=RED, opacity=0.2,
                        stroke_opacity=0.2)

        dots_fixed = [ dot.copy().scale(0.01).set_style(stroke_opacity=0).set_opacity(opacity=0) for dot in dots]

        def set_yc(t):
            return np.array([t[0],y_project,t[2]])

        def contract_line(dot_r):
            if dot_r.get_center()[0]> circle.get_center()[0]:
                new_line = Line(dot_r.copy(), Dot(set_yc(circle.get_center())-[0.08,0,0]), stroke_width=20, color=WHITE, opacity=0, stroke_opacity=0)
            else:
                new_line = Line(dot_r.copy(), Dot(set_yc(circle.get_center())+[0.08,0,0]), stroke_width=20, color=WHITE, opacity=0,
                             stroke_opacity=0)
            return new_line

        # Create a list of paths for the dots to follow
        paths = [retract_line(dot) for dot in dots]

        # Create a list of paths for the dots to follow
        paths_fixed = [contract_line(dot) for dot in dots]

        # Create the MoveAlongPath animations for all the dots
        raise_dots = [MoveAlongPath(dot, path) for dot, path in zip(dots, paths)]

        # Create the MoveAlongPath animations for all the dots
        contract_dots = [MoveAlongPath(dot, path) for dot, path in zip(dots_fixed, paths_fixed)]


        # Create an animation group to run all the MoveAlongPath animations at the same time
        anim_appear_group = AnimationGroup(*appear_dots)

        # Create an animation group to run all the MoveAlongPath animations at the same time
        anim_raise_group = AnimationGroup(*raise_dots)

        self.add(line_overlap)
        self.add(dot_center)  # trying to get dot in front

        # Create an animation group to run all the MoveAlongPath animations at the same time
        anim_contract_group = AnimationGroup(*contract_dots)

        # this works
        life_lines = [create_life_line(dot,dot) for dot in dots]

        #self.add(*dots)
        self.play(anim_appear_group, run_time=1)

        for i in range(201):
            self.add(life_lines[i])
            #life_lines[i].add_updater(lambda d: d.become(create_life_line(dots_fixed[i],dots[i])))

        # Generate the code below
        #for i in range(201):
        #    print("life_lines[" + str(i)+"].add_updater(lambda d: d.become(create_life_line(dots_fixed["+str(i)+"], dots[" +str(i) + "])))")


        life_lines[0].add_updater(lambda d: d.become(create_life_line(dots_fixed[0], dots[0])))
        life_lines[1].add_updater(lambda d: d.become(create_life_line(dots_fixed[1], dots[1])))
        life_lines[2].add_updater(lambda d: d.become(create_life_line(dots_fixed[2], dots[2])))
        life_lines[3].add_updater(lambda d: d.become(create_life_line(dots_fixed[3], dots[3])))
        life_lines[4].add_updater(lambda d: d.become(create_life_line(dots_fixed[4], dots[4])))
        life_lines[5].add_updater(lambda d: d.become(create_life_line(dots_fixed[5], dots[5])))
        life_lines[6].add_updater(lambda d: d.become(create_life_line(dots_fixed[6], dots[6])))
        life_lines[7].add_updater(lambda d: d.become(create_life_line(dots_fixed[7], dots[7])))
        life_lines[8].add_updater(lambda d: d.become(create_life_line(dots_fixed[8], dots[8])))
        life_lines[9].add_updater(lambda d: d.become(create_life_line(dots_fixed[9], dots[9])))
        life_lines[10].add_updater(lambda d: d.become(create_life_line(dots_fixed[10], dots[10])))
        life_lines[11].add_updater(lambda d: d.become(create_life_line(dots_fixed[11], dots[11])))
        life_lines[12].add_updater(lambda d: d.become(create_life_line(dots_fixed[12], dots[12])))
        life_lines[13].add_updater(lambda d: d.become(create_life_line(dots_fixed[13], dots[13])))
        life_lines[14].add_updater(lambda d: d.become(create_life_line(dots_fixed[14], dots[14])))
        life_lines[15].add_updater(lambda d: d.become(create_life_line(dots_fixed[15], dots[15])))
        life_lines[16].add_updater(lambda d: d.become(create_life_line(dots_fixed[16], dots[16])))
        life_lines[17].add_updater(lambda d: d.become(create_life_line(dots_fixed[17], dots[17])))
        life_lines[18].add_updater(lambda d: d.become(create_life_line(dots_fixed[18], dots[18])))
        life_lines[19].add_updater(lambda d: d.become(create_life_line(dots_fixed[19], dots[19])))
        life_lines[20].add_updater(lambda d: d.become(create_life_line(dots_fixed[20], dots[20])))
        life_lines[21].add_updater(lambda d: d.become(create_life_line(dots_fixed[21], dots[21])))
        life_lines[22].add_updater(lambda d: d.become(create_life_line(dots_fixed[22], dots[22])))
        life_lines[23].add_updater(lambda d: d.become(create_life_line(dots_fixed[23], dots[23])))
        life_lines[24].add_updater(lambda d: d.become(create_life_line(dots_fixed[24], dots[24])))
        life_lines[25].add_updater(lambda d: d.become(create_life_line(dots_fixed[25], dots[25])))
        life_lines[26].add_updater(lambda d: d.become(create_life_line(dots_fixed[26], dots[26])))
        life_lines[27].add_updater(lambda d: d.become(create_life_line(dots_fixed[27], dots[27])))
        life_lines[28].add_updater(lambda d: d.become(create_life_line(dots_fixed[28], dots[28])))
        life_lines[29].add_updater(lambda d: d.become(create_life_line(dots_fixed[29], dots[29])))
        life_lines[30].add_updater(lambda d: d.become(create_life_line(dots_fixed[30], dots[30])))
        life_lines[31].add_updater(lambda d: d.become(create_life_line(dots_fixed[31], dots[31])))
        life_lines[32].add_updater(lambda d: d.become(create_life_line(dots_fixed[32], dots[32])))
        life_lines[33].add_updater(lambda d: d.become(create_life_line(dots_fixed[33], dots[33])))
        life_lines[34].add_updater(lambda d: d.become(create_life_line(dots_fixed[34], dots[34])))
        life_lines[35].add_updater(lambda d: d.become(create_life_line(dots_fixed[35], dots[35])))
        life_lines[36].add_updater(lambda d: d.become(create_life_line(dots_fixed[36], dots[36])))
        life_lines[37].add_updater(lambda d: d.become(create_life_line(dots_fixed[37], dots[37])))
        life_lines[38].add_updater(lambda d: d.become(create_life_line(dots_fixed[38], dots[38])))
        life_lines[39].add_updater(lambda d: d.become(create_life_line(dots_fixed[39], dots[39])))
        life_lines[40].add_updater(lambda d: d.become(create_life_line(dots_fixed[40], dots[40])))
        life_lines[41].add_updater(lambda d: d.become(create_life_line(dots_fixed[41], dots[41])))
        life_lines[42].add_updater(lambda d: d.become(create_life_line(dots_fixed[42], dots[42])))
        life_lines[43].add_updater(lambda d: d.become(create_life_line(dots_fixed[43], dots[43])))
        life_lines[44].add_updater(lambda d: d.become(create_life_line(dots_fixed[44], dots[44])))
        life_lines[45].add_updater(lambda d: d.become(create_life_line(dots_fixed[45], dots[45])))
        life_lines[46].add_updater(lambda d: d.become(create_life_line(dots_fixed[46], dots[46])))
        life_lines[47].add_updater(lambda d: d.become(create_life_line(dots_fixed[47], dots[47])))
        life_lines[48].add_updater(lambda d: d.become(create_life_line(dots_fixed[48], dots[48])))
        life_lines[49].add_updater(lambda d: d.become(create_life_line(dots_fixed[49], dots[49])))
        life_lines[50].add_updater(lambda d: d.become(create_life_line(dots_fixed[50], dots[50])))
        life_lines[51].add_updater(lambda d: d.become(create_life_line(dots_fixed[51], dots[51])))
        life_lines[52].add_updater(lambda d: d.become(create_life_line(dots_fixed[52], dots[52])))
        life_lines[53].add_updater(lambda d: d.become(create_life_line(dots_fixed[53], dots[53])))
        life_lines[54].add_updater(lambda d: d.become(create_life_line(dots_fixed[54], dots[54])))
        life_lines[55].add_updater(lambda d: d.become(create_life_line(dots_fixed[55], dots[55])))
        life_lines[56].add_updater(lambda d: d.become(create_life_line(dots_fixed[56], dots[56])))
        life_lines[57].add_updater(lambda d: d.become(create_life_line(dots_fixed[57], dots[57])))
        life_lines[58].add_updater(lambda d: d.become(create_life_line(dots_fixed[58], dots[58])))
        life_lines[59].add_updater(lambda d: d.become(create_life_line(dots_fixed[59], dots[59])))
        life_lines[60].add_updater(lambda d: d.become(create_life_line(dots_fixed[60], dots[60])))
        life_lines[61].add_updater(lambda d: d.become(create_life_line(dots_fixed[61], dots[61])))
        life_lines[62].add_updater(lambda d: d.become(create_life_line(dots_fixed[62], dots[62])))
        life_lines[63].add_updater(lambda d: d.become(create_life_line(dots_fixed[63], dots[63])))
        life_lines[64].add_updater(lambda d: d.become(create_life_line(dots_fixed[64], dots[64])))
        life_lines[65].add_updater(lambda d: d.become(create_life_line(dots_fixed[65], dots[65])))
        life_lines[66].add_updater(lambda d: d.become(create_life_line(dots_fixed[66], dots[66])))
        life_lines[67].add_updater(lambda d: d.become(create_life_line(dots_fixed[67], dots[67])))
        life_lines[68].add_updater(lambda d: d.become(create_life_line(dots_fixed[68], dots[68])))
        life_lines[69].add_updater(lambda d: d.become(create_life_line(dots_fixed[69], dots[69])))
        life_lines[70].add_updater(lambda d: d.become(create_life_line(dots_fixed[70], dots[70])))
        life_lines[71].add_updater(lambda d: d.become(create_life_line(dots_fixed[71], dots[71])))
        life_lines[72].add_updater(lambda d: d.become(create_life_line(dots_fixed[72], dots[72])))
        life_lines[73].add_updater(lambda d: d.become(create_life_line(dots_fixed[73], dots[73])))
        life_lines[74].add_updater(lambda d: d.become(create_life_line(dots_fixed[74], dots[74])))
        life_lines[75].add_updater(lambda d: d.become(create_life_line(dots_fixed[75], dots[75])))
        life_lines[76].add_updater(lambda d: d.become(create_life_line(dots_fixed[76], dots[76])))
        life_lines[77].add_updater(lambda d: d.become(create_life_line(dots_fixed[77], dots[77])))
        life_lines[78].add_updater(lambda d: d.become(create_life_line(dots_fixed[78], dots[78])))
        life_lines[79].add_updater(lambda d: d.become(create_life_line(dots_fixed[79], dots[79])))
        life_lines[80].add_updater(lambda d: d.become(create_life_line(dots_fixed[80], dots[80])))
        life_lines[81].add_updater(lambda d: d.become(create_life_line(dots_fixed[81], dots[81])))
        life_lines[82].add_updater(lambda d: d.become(create_life_line(dots_fixed[82], dots[82])))
        life_lines[83].add_updater(lambda d: d.become(create_life_line(dots_fixed[83], dots[83])))
        life_lines[84].add_updater(lambda d: d.become(create_life_line(dots_fixed[84], dots[84])))
        life_lines[85].add_updater(lambda d: d.become(create_life_line(dots_fixed[85], dots[85])))
        life_lines[86].add_updater(lambda d: d.become(create_life_line(dots_fixed[86], dots[86])))
        life_lines[87].add_updater(lambda d: d.become(create_life_line(dots_fixed[87], dots[87])))
        life_lines[88].add_updater(lambda d: d.become(create_life_line(dots_fixed[88], dots[88])))
        life_lines[89].add_updater(lambda d: d.become(create_life_line(dots_fixed[89], dots[89])))
        life_lines[90].add_updater(lambda d: d.become(create_life_line(dots_fixed[90], dots[90])))
        life_lines[91].add_updater(lambda d: d.become(create_life_line(dots_fixed[91], dots[91])))
        life_lines[92].add_updater(lambda d: d.become(create_life_line(dots_fixed[92], dots[92])))
        life_lines[93].add_updater(lambda d: d.become(create_life_line(dots_fixed[93], dots[93])))
        life_lines[94].add_updater(lambda d: d.become(create_life_line(dots_fixed[94], dots[94])))
        life_lines[95].add_updater(lambda d: d.become(create_life_line(dots_fixed[95], dots[95])))
        life_lines[96].add_updater(lambda d: d.become(create_life_line(dots_fixed[96], dots[96])))
        life_lines[97].add_updater(lambda d: d.become(create_life_line(dots_fixed[97], dots[97])))
        life_lines[98].add_updater(lambda d: d.become(create_life_line(dots_fixed[98], dots[98])))
        life_lines[99].add_updater(lambda d: d.become(create_life_line(dots_fixed[99], dots[99])))
        life_lines[100].add_updater(lambda d: d.become(create_life_line(dots_fixed[100], dots[100])))
        life_lines[101].add_updater(lambda d: d.become(create_life_line(dots_fixed[101], dots[101])))
        life_lines[102].add_updater(lambda d: d.become(create_life_line(dots_fixed[102], dots[102])))
        life_lines[103].add_updater(lambda d: d.become(create_life_line(dots_fixed[103], dots[103])))
        life_lines[104].add_updater(lambda d: d.become(create_life_line(dots_fixed[104], dots[104])))
        life_lines[105].add_updater(lambda d: d.become(create_life_line(dots_fixed[105], dots[105])))
        life_lines[106].add_updater(lambda d: d.become(create_life_line(dots_fixed[106], dots[106])))
        life_lines[107].add_updater(lambda d: d.become(create_life_line(dots_fixed[107], dots[107])))
        life_lines[108].add_updater(lambda d: d.become(create_life_line(dots_fixed[108], dots[108])))
        life_lines[109].add_updater(lambda d: d.become(create_life_line(dots_fixed[109], dots[109])))
        life_lines[110].add_updater(lambda d: d.become(create_life_line(dots_fixed[110], dots[110])))
        life_lines[111].add_updater(lambda d: d.become(create_life_line(dots_fixed[111], dots[111])))
        life_lines[112].add_updater(lambda d: d.become(create_life_line(dots_fixed[112], dots[112])))
        life_lines[113].add_updater(lambda d: d.become(create_life_line(dots_fixed[113], dots[113])))
        life_lines[114].add_updater(lambda d: d.become(create_life_line(dots_fixed[114], dots[114])))
        life_lines[115].add_updater(lambda d: d.become(create_life_line(dots_fixed[115], dots[115])))
        life_lines[116].add_updater(lambda d: d.become(create_life_line(dots_fixed[116], dots[116])))
        life_lines[117].add_updater(lambda d: d.become(create_life_line(dots_fixed[117], dots[117])))
        life_lines[118].add_updater(lambda d: d.become(create_life_line(dots_fixed[118], dots[118])))
        life_lines[119].add_updater(lambda d: d.become(create_life_line(dots_fixed[119], dots[119])))
        life_lines[120].add_updater(lambda d: d.become(create_life_line(dots_fixed[120], dots[120])))
        life_lines[121].add_updater(lambda d: d.become(create_life_line(dots_fixed[121], dots[121])))
        life_lines[122].add_updater(lambda d: d.become(create_life_line(dots_fixed[122], dots[122])))
        life_lines[123].add_updater(lambda d: d.become(create_life_line(dots_fixed[123], dots[123])))
        life_lines[124].add_updater(lambda d: d.become(create_life_line(dots_fixed[124], dots[124])))
        life_lines[125].add_updater(lambda d: d.become(create_life_line(dots_fixed[125], dots[125])))
        life_lines[126].add_updater(lambda d: d.become(create_life_line(dots_fixed[126], dots[126])))
        life_lines[127].add_updater(lambda d: d.become(create_life_line(dots_fixed[127], dots[127])))
        life_lines[128].add_updater(lambda d: d.become(create_life_line(dots_fixed[128], dots[128])))
        life_lines[129].add_updater(lambda d: d.become(create_life_line(dots_fixed[129], dots[129])))
        life_lines[130].add_updater(lambda d: d.become(create_life_line(dots_fixed[130], dots[130])))
        life_lines[131].add_updater(lambda d: d.become(create_life_line(dots_fixed[131], dots[131])))
        life_lines[132].add_updater(lambda d: d.become(create_life_line(dots_fixed[132], dots[132])))
        life_lines[133].add_updater(lambda d: d.become(create_life_line(dots_fixed[133], dots[133])))
        life_lines[134].add_updater(lambda d: d.become(create_life_line(dots_fixed[134], dots[134])))
        life_lines[135].add_updater(lambda d: d.become(create_life_line(dots_fixed[135], dots[135])))
        life_lines[136].add_updater(lambda d: d.become(create_life_line(dots_fixed[136], dots[136])))
        life_lines[137].add_updater(lambda d: d.become(create_life_line(dots_fixed[137], dots[137])))
        life_lines[138].add_updater(lambda d: d.become(create_life_line(dots_fixed[138], dots[138])))
        life_lines[139].add_updater(lambda d: d.become(create_life_line(dots_fixed[139], dots[139])))
        life_lines[140].add_updater(lambda d: d.become(create_life_line(dots_fixed[140], dots[140])))
        life_lines[141].add_updater(lambda d: d.become(create_life_line(dots_fixed[141], dots[141])))
        life_lines[142].add_updater(lambda d: d.become(create_life_line(dots_fixed[142], dots[142])))
        life_lines[143].add_updater(lambda d: d.become(create_life_line(dots_fixed[143], dots[143])))
        life_lines[144].add_updater(lambda d: d.become(create_life_line(dots_fixed[144], dots[144])))
        life_lines[145].add_updater(lambda d: d.become(create_life_line(dots_fixed[145], dots[145])))
        life_lines[146].add_updater(lambda d: d.become(create_life_line(dots_fixed[146], dots[146])))
        life_lines[147].add_updater(lambda d: d.become(create_life_line(dots_fixed[147], dots[147])))
        life_lines[148].add_updater(lambda d: d.become(create_life_line(dots_fixed[148], dots[148])))
        life_lines[149].add_updater(lambda d: d.become(create_life_line(dots_fixed[149], dots[149])))
        life_lines[150].add_updater(lambda d: d.become(create_life_line(dots_fixed[150], dots[150])))
        life_lines[151].add_updater(lambda d: d.become(create_life_line(dots_fixed[151], dots[151])))
        life_lines[152].add_updater(lambda d: d.become(create_life_line(dots_fixed[152], dots[152])))
        life_lines[153].add_updater(lambda d: d.become(create_life_line(dots_fixed[153], dots[153])))
        life_lines[154].add_updater(lambda d: d.become(create_life_line(dots_fixed[154], dots[154])))
        life_lines[155].add_updater(lambda d: d.become(create_life_line(dots_fixed[155], dots[155])))
        life_lines[156].add_updater(lambda d: d.become(create_life_line(dots_fixed[156], dots[156])))
        life_lines[157].add_updater(lambda d: d.become(create_life_line(dots_fixed[157], dots[157])))
        life_lines[158].add_updater(lambda d: d.become(create_life_line(dots_fixed[158], dots[158])))
        life_lines[159].add_updater(lambda d: d.become(create_life_line(dots_fixed[159], dots[159])))
        life_lines[160].add_updater(lambda d: d.become(create_life_line(dots_fixed[160], dots[160])))
        life_lines[161].add_updater(lambda d: d.become(create_life_line(dots_fixed[161], dots[161])))
        life_lines[162].add_updater(lambda d: d.become(create_life_line(dots_fixed[162], dots[162])))
        life_lines[163].add_updater(lambda d: d.become(create_life_line(dots_fixed[163], dots[163])))
        life_lines[164].add_updater(lambda d: d.become(create_life_line(dots_fixed[164], dots[164])))
        life_lines[165].add_updater(lambda d: d.become(create_life_line(dots_fixed[165], dots[165])))
        life_lines[166].add_updater(lambda d: d.become(create_life_line(dots_fixed[166], dots[166])))
        life_lines[167].add_updater(lambda d: d.become(create_life_line(dots_fixed[167], dots[167])))
        life_lines[168].add_updater(lambda d: d.become(create_life_line(dots_fixed[168], dots[168])))
        life_lines[169].add_updater(lambda d: d.become(create_life_line(dots_fixed[169], dots[169])))
        life_lines[170].add_updater(lambda d: d.become(create_life_line(dots_fixed[170], dots[170])))
        life_lines[171].add_updater(lambda d: d.become(create_life_line(dots_fixed[171], dots[171])))
        life_lines[172].add_updater(lambda d: d.become(create_life_line(dots_fixed[172], dots[172])))
        life_lines[173].add_updater(lambda d: d.become(create_life_line(dots_fixed[173], dots[173])))
        life_lines[174].add_updater(lambda d: d.become(create_life_line(dots_fixed[174], dots[174])))
        life_lines[175].add_updater(lambda d: d.become(create_life_line(dots_fixed[175], dots[175])))
        life_lines[176].add_updater(lambda d: d.become(create_life_line(dots_fixed[176], dots[176])))
        life_lines[177].add_updater(lambda d: d.become(create_life_line(dots_fixed[177], dots[177])))
        life_lines[178].add_updater(lambda d: d.become(create_life_line(dots_fixed[178], dots[178])))
        life_lines[179].add_updater(lambda d: d.become(create_life_line(dots_fixed[179], dots[179])))
        life_lines[180].add_updater(lambda d: d.become(create_life_line(dots_fixed[180], dots[180])))
        life_lines[181].add_updater(lambda d: d.become(create_life_line(dots_fixed[181], dots[181])))
        life_lines[182].add_updater(lambda d: d.become(create_life_line(dots_fixed[182], dots[182])))
        life_lines[183].add_updater(lambda d: d.become(create_life_line(dots_fixed[183], dots[183])))
        life_lines[184].add_updater(lambda d: d.become(create_life_line(dots_fixed[184], dots[184])))
        life_lines[185].add_updater(lambda d: d.become(create_life_line(dots_fixed[185], dots[185])))
        life_lines[186].add_updater(lambda d: d.become(create_life_line(dots_fixed[186], dots[186])))
        life_lines[187].add_updater(lambda d: d.become(create_life_line(dots_fixed[187], dots[187])))
        life_lines[188].add_updater(lambda d: d.become(create_life_line(dots_fixed[188], dots[188])))
        life_lines[189].add_updater(lambda d: d.become(create_life_line(dots_fixed[189], dots[189])))
        life_lines[190].add_updater(lambda d: d.become(create_life_line(dots_fixed[190], dots[190])))
        life_lines[191].add_updater(lambda d: d.become(create_life_line(dots_fixed[191], dots[191])))
        life_lines[192].add_updater(lambda d: d.become(create_life_line(dots_fixed[192], dots[192])))
        life_lines[193].add_updater(lambda d: d.become(create_life_line(dots_fixed[193], dots[193])))
        life_lines[194].add_updater(lambda d: d.become(create_life_line(dots_fixed[194], dots[194])))
        life_lines[195].add_updater(lambda d: d.become(create_life_line(dots_fixed[195], dots[195])))
        life_lines[196].add_updater(lambda d: d.become(create_life_line(dots_fixed[196], dots[196])))
        life_lines[197].add_updater(lambda d: d.become(create_life_line(dots_fixed[197], dots[197])))
        life_lines[198].add_updater(lambda d: d.become(create_life_line(dots_fixed[198], dots[198])))
        life_lines[199].add_updater(lambda d: d.become(create_life_line(dots_fixed[199], dots[199])))
        life_lines[200].add_updater(lambda d: d.become(create_life_line(dots_fixed[200], dots[200])))
        """ """
        self.wait(2)
        self.play(anim_raise_group, run_time = 6)



        self.add(dot_center)
        self.wait(4)
        #vg = VGroup(*life_lines, dotrest)
        #for l in life_lines:
        #    l.add_to_back(dotrest)
        #self.remove(dotrest)



        self.play(anim_contract_group, run_time=6)
        #print(self.mobjects


        def create_rot_arc(dot):
            center = circle.get_center()
            radius = circle.get_width() / 2
            # angle = dot_angel.get_angle()
            angle = np.arctan2(dot.get_y() - center[1], dot.get_x() - center[0])

            #
            #end_point = line_overlap.get_end()

            #rightmost_x = circle.get_center()[0] + circle.get_width() / 2  # rightmost_x #np.array([x, y, 0])

            x = center[0] + radius * np.cos(2*angle) #np.pi / 3
            y = center[1] + radius * np.sin(2*angle) #

            return ArcBetweenPoints(start=dot.get_center(), end=[x,y,0], stroke_color=GREY,
                                               angle=angle, radius=radius, stroke_opacity=1)

        # Create a list of paths for the dots to follow
        paths_rot = [create_rot_arc(dot) for dot in dots]

        # Create the MoveAlongPath animations for all the dots
        rot_dots = [MoveAlongPath(dot, path) for dot, path in zip(dots, paths_rot)]

        # Create an animation group to run all the MoveAlongPath animations at the same time
        anim_rot_group = AnimationGroup(*rot_dots)

        def update_visibility_dot(dot):
            if dot.get_center()[1]<circle.get_center()[1]:
                dot.set_opacity(0)

        def update_visibility_line(line):
            if line.get_start()[1]<circle.get_center()[1]:
                line.set_opacity(0)

        for ll in life_lines:
            ll.add_updater(lambda d: update_visibility_line(d))

        self.wait(1)

        self.play(anim_rot_group, run_time=6)

        for ll in life_lines:
            ll.clear_updaters()

        dots_fo = []
        for i in negative_x_indexes:
            self.remove(life_lines[i])
            dots_fo.append(FadeOut(dots[i]))

        self.wait(4)
        line_y = []
        for i in positive_x_indexes:
            life_lines[i].set_color(YELLOW)
            dots[i].set_color(YELLOW)
            self.wait(0.01)

        # note : should l_rotating get out sooner ?
        self.play(FadeOut(nicene7),FadeOut(l1),FadeOut(l_ima),FadeOut(label_i),FadeOut(l_rotating), FadeOut(l_left), run_time=6)

        # Complex map
        c_grid = ComplexPlane(x_range= [-20.0, 20.0, 1.0],y_range=[-20,20,1], unit_size=2)

        target_center = l_ima.n2p(0) #(l1.get_start() + l1.get_end()) / 2 #line_overlap.get_start()
        c_grid_center = c_grid.get_center() #(c_grid.get_start() + c_grid.get_end()) / 2
        cg_shift = c_grid_center - target_center
        # Shift the Axes and l0 to align their centers with the origin
        c_grid.shift(-cg_shift)

        moving_c_grid = c_grid.copy()
        moving_c_grid.prepare_for_nonlinear_transform()
        #c_grid.set_stroke(BLUE_E, 1)
        mc_grid_center = moving_c_grid.get_center() #(moving_c_grid.get_start() + moving_c_grid.get_end()) / 2 #
        mcg_shift = mc_grid_center - target_center
        # Shift the Axes and l0 to align their centers with the origin
        moving_c_grid.shift(-mcg_shift) #.shift([-0.08,0,0])

        print(moving_c_grid.n2p(0))
        print(l1.n2p(0))
        print(l_ima.n2p(0))
        print(dot_center.get_center())

        def c2p(z):
            r = abs(z)
            theta = cmath.phase(z )
            return r, theta

        def p2c(r, theta):
            x = r * cmath.cos(theta)
            y = r * cmath.sin(theta)
            return x + y * 1j

        def compress_plan(z):
            zo = (target_center[0] + target_center[1] * 1j)
            r, theta = c2p((z-zo)/2)
            x = target_center[0]+2*(4/np.pi)*math.atan(r) * cmath.cos(theta)
            y = target_center[1]+2*(4/np.pi)*math.atan(r) * cmath.sin(theta)
            return x + y * 1j
        self.add(line_overlap)
        self.add(dot_center)
        self.add(text_plus)
        self.add(text_minus)
        # make text_plus appear in front with vgroup

        self.play(
            FadeIn(moving_c_grid),run_time=3

        )

        self.add(text_plus)
        self.add(text_minus)
        self.add(*dots)

        moving_c_grid.add_coordinate_labels(font_size=24)
        self.add(line_overlap)
        self.add(dot_center)
        self.wait()
        self.play(
            moving_c_grid.animate.apply_complex_function(lambda z: compress_plan(z) ),
            triangle_g.animate.apply_complex_function(lambda z: compress_plan(z)),
            triangle_y.animate.apply_complex_function(lambda z: compress_plan(z)),
            l_right_fixed.animate.apply_complex_function(lambda z: compress_plan(z)),
            text_plus.animate.apply_complex_function(lambda z: compress_plan(z)),
            text_minus.animate.apply_complex_function(lambda z: compress_plan(z)),

            run_time=6,
        )
        self.add(line_overlap)
        self.add(dot_center)
        self.wait(2)

        nicene8 = Text(
            "I believe in the Holy Spirit, the Lord,\n the giver of life, who proceeds\n from the Father and the Son,",
            font="Arial",
            # t2c is a dict that you can choose color for different text
            t2c={"Holy Spirit": YELLOW, "Lord": YELLOW, "Father": YELLOW, "Son": YELLOW,"life": BLUE}
        )

        text_background = Rectangle(
            width=10,
            height=2,
            fill_color=BLACK,
            fill_opacity=1,
            stroke_opacity=0,
        )

        text_background.to_edge(DOWN).shift(0.3*DOWN)

        self.play(FadeIn(text_background),run_time=4)
        self.play(Write(nicene8.to_edge(DOWN)), run_time=12)

        self.wait(4)

        dot_holy = Dot(color=YELLOW, stroke_color=YELLOW, fill_color=YELLOW)
        dot_holy.move_to(l1.n2p(3))
        print(l1.n2p(3))
        self.play(FadeIn(dot_holy, scale=0.5))

        nicene9 = Text(
            "who with the Father and the Son \n is adored and glorified, \n who has spoken through the prophets.",
            font="Arial",
            # t2c is a dict that you can choose color for different text
            t2c={"Father": YELLOW, "Son": YELLOW, "prophets": BLUE}
        )

        self.wait(8)
        self.play(FadeOut(nicene8), run_time =4)

        self.play(Write(nicene9.to_edge(DOWN)), run_time=10)


        exodus_lines = []
        # add succession
        for i in range(20):
            zo = (target_center[0] + target_center[1] * 1j)

            x = target_center[0] + 2* (4 / np.pi) * math.atan(i)
            x2 = target_center[0] + 2* (4 / np.pi) * math.atan(i+1)
            y = target_center[1]

            exodus_lines.append(Line([x,y,0],[x2,y,0] , color=YELLOW,opacity=0)) #moving_c_grid.n2p(math.atan(i+1) +2j)

        exodus_anim = AnimationGroup(*[FadeIn(l, run_time=5) for l in exodus_lines], lag_ratio=0.7)
        exodus_anim_out = AnimationGroup(*[FadeOut(l, run_time=5) for l in reversed(exodus_lines)], lag_ratio=0.7)

        self.play(exodus_anim,dot_holy.animate.move_to(l1.n2p(2)).shift([-0.11,0,0]),run_time=15)

        label_inf = TexText("""
                         $+\infty$
                    """, font_size =font_size_rotating,color=YELLOW).next_to(dot_holy.get_center(), RIGHT, buff=0.5).set_stroke(color=YELLOW, width=2)

        self.add(label_inf)

        self.wait(4)

        self.play(exodus_anim_out, run_time=8)

        self.wait(6)
        self.play(FadeOut(nicene9, run_time=3))

        nicene10 = Text(
            "I believe in one, holy,\n  catholic and apostolic Church. ",
            font="Arial",
            # t2c is a dict that you can choose color for different text
            t2c={"catholicd": YELLOW, "Church": YELLOW, "prophets": BLUE}
        )

        self.play(Write(nicene10.to_edge(DOWN).shift(0.5*UP)), run_time=6)
        self.wait(7)

        life_lines_remain = [life_lines[i] for i in positive_x_indexes]
        g = Group(*dots,*dots_fixed,triangle_y, moving_c_grid, dot_holy,label_inf,
                  dot_center,line_overlap,arc, l_right,l_right_fixed,triangle_g,text_plus,text_minus)
        l_right.clear_updaters() #invisible line serving as rotating lines
        #l_left.clear_updaters()
        self.remove(dotrest)
        self.remove(l_left) #l_left
        self.remove(dotl)
        self.remove(dot_center)
        self.remove(dot_rot_label_neg)
        self.remove(dot_rot_label)
        self.remove(l_right_fixed)




        self.play(g.animate.scale(0.5),run_time=5)


        self.play(FadeOut(nicene10, run_time=3))


        nicene11 = Text(
            "I confess one Baptism for the forgiveness \n of sins and I look forward to the resurrection \nof the dead and the life of the world to come.",
            font="Arial",
            # t2c is a dict that you can choose color for different text
            t2c={"life": YELLOW, "Church": YELLOW, "prophets": BLUE}
        )
        self.play(Write(nicene11.to_edge(DOWN)), run_time=10)
        self.wait(7)

        a = AnimationGroup(*[l.animate.shift(4*LEFT) for l in life_lines_remain],g.animate.shift(4*LEFT))
        self.play(a,run_time=5)

        for i in reversed(positive_x_indexes):
            self.play(dots[i].animate.move_to(l1.n2p(0)), run_time=0.1)

        dot_life = Dot(c_center,color=YELLOW,fill_color = YELLOW, stroke_color = YELLOW)

        self.play(dot_life.animate.scale(1000), run_time=8)

        self.wait(10)





